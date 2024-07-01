"use client";
import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import CarbCodeSection from "hexis/app/(client)/client-fuel-plan/components/carb-code";
import WorkoutTracker from "hexis/app/(client)/client-fuel-plan/components/wearable";
import HoverComponent from "hexis/app/(client)/client-fuel-plan/components/hover";

import { IMacros, IMeal, IMealVerification } from "hexis/state/user/types";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { useMutation, useQuery } from "@tanstack/react-query";

import { addMeal, getClientNotes } from "hexis/lib/graphql-client";
import { CARB_CODE } from "hexis/constants/user";
import {
  Coach_Note_Types,
  IntraFuellingRecommendation,
  Maybe,
  Meal_Type,
  MutationAddMealArgs,
  Note,
  Workout,
  Workout_Status,
} from "hexis/generated/graphql";
import { formatTimeHourMinute } from "hexis/utils/dates";
import AddNote from "../icons/general/AddNote";
import { PlusIcon } from "../icons/general";
import { useAppDispatch, useAppSelector } from "hexis/hooks/useRedux";
import { setNotes } from "hexis/state/client-notes/slice";
import { truncate } from "hexis/utils/truncate";
import clsx from "clsx";
import SvgForkKnifeIcon from "../icons/general/ForkKnifeIcon";
import DarkBowlFoodIcon from "../icons/general/DarkBowlFood";
import CookieIcon from "../icons/general/CookieIcon";

import "./index.css";
import TimePicker from "hexis/app/(client)/client-profile/components/time-picker";
import { Button } from "../common/button";
import { refetchClentWeek } from "../common/date-component";
import TrashIcon from "../icons/general/TrashIcon";
import { WorkoutWithTimeAndMealFlag, getActiveMeals, getActiveWorkouts } from "./helpers";

export interface ICarbCodeSection {
  dayId: string;
  mealId: string;
  mealType?: Meal_Type;
  name?: string;
  calories?: string;
  energy?: number;
  carb?: number;
  protein?: number;
  fat?: number;
  time?: string;
  carbsCode: CARB_CODE;
  tracked?: boolean;
  trackedTime?: string;
  caloriesTracked?: string;
  skip?: boolean;
  skippedTime?: string;
  trackedCarbsCode?: CARB_CODE;
  mealVerification?: IMealVerification;
  suggestedKcal?: number;
  maxCalories?: number | undefined | null;
  minCalories?: number | undefined | null;

  mainHighMax?: number;
  mainHighMin?: number;
  mainMedMax?: number;
  mainMedMin?: number;
  mainLowMax?: number;
  mainLowMin?: number;

  snackHighMax?: number;
  snackHighMin?: number;
  snackMedMax?: number;
  snackMedMin?: number;
  snackLowMax?: number;
  snackLowMin?: number;
}

export interface IWorkoutSection {
  wearable?: boolean;
  competition?: boolean;
  performance?: boolean;
  activity?: string;
  intensity?: string;
  startTime?: string;
  endTime?: string;
}

interface ICarbCodeContainer {
  dayId: string;
  columnNumber: number;
  date: string;
  calories?: string;
  carbohydrates?: string;
  protein?: string;
  fat?: string;
  tracked?: boolean;
  caloriesProgress?: string;
  carbsProgress?: string;
  proteinProgress?: string;
  fatProgress?: string;
  carbsData?: any;
  selectedDate?: string;
  onClick?: () => void;
  setModal: Function;
  setActivityId: Function;
  setDate: Function;
  setShowDayNoteModal: Function;
  showModal: boolean;
  showMealModal: boolean;
  showDayNoteModal: boolean;
  setContent: Function;
  setShowActivityModal: Function;
  setShowMealModal: Function;
  setAddWorkoutModal: Function;
  trackedMacroValue?: string;
  targetMacroValue?: string;
  meals?: IMeal[];
  macros?: IMacros;
  workouts: Array<Maybe<Workout>>;
  beforeCreation: boolean;
  intraFuelling?: Maybe<Array<Maybe<IntraFuellingRecommendation>>>;
  setWorkoutEditItem: Function;
  mainHighMax?: number;
  mainHighMin?: number;
  mainMedMax?: number;
  mainMedMin?: number;
  mainLowMax?: number;
  mainLowMin?: number;

  snackHighMax?: number;
  snackHighMin?: number;
  snackMedMax?: number;
  snackMedMin?: number;
  snackLowMax?: number;
  snackLowMin?: number;
}

interface INewMeal {
  mealType: Meal_Type;
  mealName: string;
  mealTime: string;
}

// CarbsCodeContainer
export default function CarbCodesContainer({
  dayId,
  columnNumber,
  date,
  setDate,
  macros,
  tracked,
  onClick,
  selectedDate,
  setModal,
  showMealModal,
  setShowDayNoteModal,
  setShowActivityModal,
  setShowMealModal,
  setWorkoutEditItem,
  setAddWorkoutModal,
  setActivityId,
  setContent,
  meals,
  workouts,
  mainHighMax,
  mainHighMin,
  mainMedMax,
  mainMedMin,
  mainLowMax,
  snackHighMax,
  snackHighMin,
  snackMedMax,
  snackMedMin,
  snackLowMax,
  intraFuelling,
}: ICarbCodeContainer) {
  const dispatch = useAppDispatch();
  const { selectedClient, user, notes, macrosAndEnergy } = useAppSelector(
    ({ user: { selectedClient, user }, clientNotes: { notes }, carbCoding: { macrosAndEnergy } }) => ({
      selectedClient,
      user,
      notes,
      macrosAndEnergy,
    }),
  );

  const { data } = useQuery({
    queryKey: ["getClientNotes", selectedClient?.id],
    queryFn: () =>
      getClientNotes({
        clientId: selectedClient?.id || "",
        coachId: user?.id || "",
      }),
    enabled: !!selectedClient?.id,
  });

  const { mutateAsync: addMealMutation } = useMutation({
    mutationKey: ["add-meal"],
    mutationFn: (args: MutationAddMealArgs) => addMeal({ input: args.input }),
  });

  const mealRef = useRef(null);

  const useOutSideAlerter = (ref: React.RefObject<any>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setShowMealModal(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutSideAlerter(mealRef);

  useEffect(() => {
    if (data) {
      dispatch(setNotes(data?.getCoachNotes));
    }
    return () => {
      dispatch(setNotes([]));
    };
  }, [data, dispatch]);

  const [hover, setHover] = useState<boolean>(false);
  const [hoverDay, setHoverDay] = useState<boolean>(false);
  const [newMeal, setNewMeal] = useState(null as unknown as INewMeal);
  const [isActivatedButton, setIsActivatedButton] = useState(null);
  const onHover = () => {
    setHover(true);
  };

  const offHover = () => {
    setHover(false);
  };

  const addNewMeal = (mealType: Meal_Type) => {
    setShowMealModal(false);
    setNewMeal({
      mealType,
      mealName: "",
      mealTime: "",
    });
  };

  const confirmAddNewMeal = () => {
    addMealMutation({
      input: {
        dayId: dayId,
        mealType: newMeal.mealType,
        mealName: newMeal.mealName,
        time: `${newMeal.mealTime}:00.000Z`,
      },
    });
    refetchClentWeek();
  };
  const TrackedHeader = () => (
    <div className={`relative group py-4 px-3 bg-darkgrey1-600 text-xs font-medium tracking-[0.5px] hover:bg-black/80`} onClick={onClick}>
      <div className="absolute top-0 left-0 w-full h-full justify-center items-center max-w-full flex opacity-0 group-hover:opacity-100">
        <button
          className="flex py-[10px] px-6 justify-center items-center gap-[10px] rounded-lg border-activeblue-100 bg-activeblue-100 active:${} shadow-[0px 1px 3px 0px rgba(16, 24, 40, 0.20), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)]"
          id="view-report"
        >
          <span className="text-sm font-medium tracking-[0.25px]">View Report</span>
        </button>
      </div>
      <div className="w-full group-hover:opacity-20">
        <div className="w-full flex justify-between items-center space-x-1">
          <p className="text-xs font-semibold tracking-[0.5px]">Calories</p>
          <p className="text-[10px] tracking-[0.25px]">
            {`${Math.round(macros?.energyCurrent || 0)}/${Math.round(macros?.energy || 0)}`} kcal
          </p>
        </div>

        <progress
          className="progress progress-accent h-1 bg-lightgrey1-600 bg-opacity-30"
          value={macros?.energyCurrent as number}
          max={macros?.energy as number}
        ></progress>
      </div>

      <div className="w-full group-hover:opacity-20">
        <div className="w-full flex justify-between items-center space-x-1">
          <p className="text-xs font-semibold tracking-[0.5px]">Carbs</p>
          <p className="text-[10px] tracking-[0.25px]">{`${Math.round(macros?.carbsCurrent || 0)}/${Math.round(macros?.carb || 0)}`} g</p>
        </div>

        <progress
          className="progress progress-primary h-1 bg-lightgrey1-600 bg-opacity-30"
          value={macros?.carbsCurrent as number}
          max={macros?.carb as number}
        ></progress>
      </div>

      <div className="w-full group-hover:opacity-20">
        <div className="w-full flex justify-between items-center space-x-1">
          <p className="text-xs font-semibold tracking-[0.5px]">Protein</p>
          <p className="text-[10px] tracking-[0.25px]">
            {`${Math.round(macros?.proteinCurrent || 0)}/${Math.round(macros?.protein || 0)}`} g
          </p>
        </div>

        <progress
          className="progress progress-primary h-1 bg-lightgrey1-600 bg-opacity-30"
          value={macros?.proteinCurrent as number}
          max={macros?.protein as number}
        ></progress>
      </div>

      <div className="w-full group-hover:opacity-20">
        <div className="w-full flex justify-between items-center space-x-1">
          <p className="text-xs font-semibold tracking-[0.5px]">Fat</p>
          <p className="text-[10px] tracking-[0.25px]">{`${Math.round(macros?.fatCurrent || 0)}/${Math.round(macros?.fat || 0)}`} g</p>
        </div>

        <progress
          className="progress progress-primary h-1 bg-lightgrey1-600 bg-opacity-30"
          value={macros?.fatCurrent as number}
          max={macros?.fat as number}
        ></progress>
      </div>
    </div>
  );

  let todaysActiveWorkouts: WorkoutWithTimeAndMealFlag[] = [];
  if (workouts) {
    // Casting here as not sure how to convince TS that Maybe<Workout[]> is a thing.
    todaysActiveWorkouts = getActiveWorkouts(workouts as Workout[]);
  }
  const todaysActiveMeals = meals ? getActiveMeals(meals) : [];
  const combinedWorkoutsAndMeals = [...(todaysActiveMeals || []), ...todaysActiveWorkouts];
  const todaysIncompleteWorkouts = workouts?.filter(workout => workout?.status === Workout_Status.Incomplete);

  const incompleteWorkoutElements: (JSX.Element | null)[] = todaysIncompleteWorkouts?.map(
    (workout, index) =>
      workout && (
        <div key={index}>
          {index === 0 && <div className="h-0.5 self-stretch opacity-20 bg-gray-400 mb-4"></div>}
          <WorkoutTracker
            key={workout?.id}
            workout={workout}
            tracked={tracked}
            trackedTime={workout?.intraFuellingMeal?.mealVerification?.skipped === false ? dayjs(workout?.start).utc().format("HH:mm") : ""}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              setDate(workout?.start);
              setActivityId && setActivityId(workout?.activity?.id);
              setWorkoutEditItem(workout);
              setAddWorkoutModal(true);
              e.stopPropagation();
            }}
          />
          <div className="h-0.5 self-stretch opacity-20 bg-gray-400 my-4"></div>
        </div>
      ),
  );

  const DailyNote = ({
    id,
    title,
    body,
    dayNoteDay,
    utcOffset,
    alertNotification,
  }: {
    id: string;
    title: string;
    body: string;
    dayNoteDay: string;
    utcOffset?: number;
    alertNotification?: boolean;
  }) => {
    return (
      <>
        <div
          key={id}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            setContent({
              id,
              title,
              body,
              dayNoteDay,
              utcOffset,
              alertNotification,
            });
            setShowDayNoteModal(true);
            e.stopPropagation();
          }}
          className="flex flex-col my-3 bg-background-300 p-2 rounded-lg gap-1 w-full h-full hover:bg-opacity-90"
          style={{
            boxShadow: "0px 1px 3px 0px rgba(16, 24, 40, 0.20), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
          }}
        >
          <div className="flex items-center gap-2">
            <AddNote width={15} height={15} />
            <p className="text-xs font-medium tracking-[0.25px]">{truncate(title, 17, 17)}</p>
          </div>
          <div>
            <p className="text-xxs line-clamp-3 tracking-[0.15px]">{truncate(body, 64, 64)}</p>
          </div>
        </div>
        <div className="border-b-2 border-opacity-20 border-gray-400 my-4" />
      </>
    );
  };

  const DailyNotes = (dayNotes: Note[]) =>
    dayNotes.map((notes: Note) =>
      DailyNote({
        id: notes.id,
        title: notes.title,
        body: notes.body,
        dayNoteDay: notes.dayNoteDay,
        utcOffset: notes.utcOffset || 0,
        alertNotification: notes.alertNotification || false,
      }),
    );

  const dayNotes = notes?.filter(note => {
    return dayjs(note.dayNoteDay).utc().format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD") && note.type === Coach_Note_Types.Day;
  });

  const checkNoteAvailability = dayNotes.length > 0;

  return (
    <div className="w-full text-xs border-r cursor-pointer border-lightgrey1-600 border-opacity-10 border-b-0 min-h-screen h-full">
      <div className="relative">
        {/* Header */}
        <div className="bg-background-300 w-full h-[37px] flex justify-between items-center px-3 py-2 border-b border-darkgrey1-300">
          <p className="font-normal text-sm tracking-[0.25px]">{date ? dayjs(date).format("ddd DD") : ""}</p>
          <div className="w-1/4 h-4 flex relative cursor-pointer" onMouseOver={onHover} onMouseLeave={offHover}>
            <span className="absolute right-1 rounded-full bg-background-400 border-2 border-carbcodehigh-100 h-[11.961px] w-[11.961px]" />
            <span className="absolute right-3 rounded-full bg-background-400 border-2 border-carbcodemedium-100 h-[11.961px] w-[11.961px]" />
            <span className="absolute right-5 rounded-full bg-background-400 border-2 border-carbcodelow-100 h-[11.961px] w-[11.961px]" />
          </div>
        </div>

        {hover && (
          <HoverComponent
            snackHighMin={snackHighMin}
            snackMedMin={snackMedMin}
            snackMedMax={snackMedMax}
            snackLowMax={snackLowMax}
            snackLowMin={0}
            mainHighMin={mainHighMin}
            mainMedMin={mainMedMin}
            mainMedMax={mainMedMax}
            mainLowMax={mainLowMax}
            mainLowMin={0}
            columnNumber={columnNumber}
          />
        )}
      </div>

      {/* Body */}
      <div className="font-medium">
        {macrosAndEnergy && <TrackedHeader />}

        <div className="py-4 px-3" onMouseOver={() => setHoverDay(true)} onMouseLeave={() => setHoverDay(false)}>
          {dayNotes && !isEmpty(dayNotes) ? DailyNotes(dayNotes) : null}
          {/* When there's no meals data */}
          {incompleteWorkoutElements}
          {combinedWorkoutsAndMeals &&
            combinedWorkoutsAndMeals
              .sort((itemA, itemB) => {
                return itemA.time.localeCompare(itemB.time);
              })
              .map((item, index) => {
                if (item.isMeal) {
                  const meal = item as IMeal;
                  return (
                    <CarbCodeSection
                      key={index}
                      mealId={meal.id!}
                      dayId={dayId}
                      carbsCode={meal.carbCode}
                      energy={meal.energy}
                      mealType={meal.mealType}
                      name={meal.mealName}
                      carb={meal.carb}
                      fat={meal.fat}
                      protein={meal.protein}
                      time={formatTimeHourMinute(meal.time)}
                      trackedTime={meal.mealVerification ? dayjs(meal.mealVerification?.time).utc().format("HH:mm") : ""}
                      caloriesTracked={meal.mealVerification?.energy?.toString()}
                      skippedTime={meal.mealVerification ? dayjs(meal.mealVerification?.time).utc().format("HH:mm") : ""}
                      skip={meal.mealVerification?.skipped || false}
                      tracked={tracked && !isNil(meal.mealVerification)}
                      trackedCarbsCode={meal.mealVerification?.carbCode}
                      mealVerification={meal.mealVerification as IMealVerification}
                      snackHighMax={snackHighMax}
                      snackHighMin={snackHighMin}
                      snackMedMin={snackMedMin}
                      snackMedMax={snackMedMax}
                      snackLowMax={snackLowMax}
                      snackLowMin={0}
                      mainHighMax={mainHighMax}
                      mainHighMin={mainHighMin}
                      mainMedMin={mainMedMin}
                      mainMedMax={mainMedMax}
                      mainLowMax={mainLowMax}
                      mainLowMin={0}
                    />
                  );
                }
                if (!item.isMeal) {
                  const workout = item as Workout;
                  const intraFuellingRecommendations = intraFuelling?.reduce(
                    (acc, intra) => {
                      // if(intra !== null)
                      acc[intra?.workoutId || "key"] = intra!;
                      return acc;
                    },
                    {} as { [key: string]: IntraFuellingRecommendation },
                  );

                  const intra = intraFuellingRecommendations ? intraFuellingRecommendations[workout?.id] : undefined;
                  return (
                    <WorkoutTracker
                      key={workout.id}
                      workout={workout}
                      tracked={tracked}
                      trackedTime={
                        workout.intraFuellingMeal?.mealVerification?.skipped === false ? dayjs(workout?.start).utc().format("HH:mm") : ""
                      }
                      intraFuelling={intra}
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        setDate(workout.start);
                        setActivityId && setActivityId(workout?.activity?.id);
                        setWorkoutEditItem(workout);
                        setAddWorkoutModal(true);
                        e.stopPropagation();
                      }}
                    />
                  );
                }
                return;
              })}
          {newMeal && (
            <div
              className={`flex p-2 flex-col items-center gap-2 my-3 self-stretch rounded-lg border-l-[3px] bg-background-300 ${newMeal.mealType === Meal_Type.Main ? "border-activeblue-100" : "border-blue2-100"}`}
            >
              <div className="flex justify-center items-start gap-2 self-stretch">
                {newMeal.mealType === Meal_Type.Snack && <CookieIcon width={25} height={24} color="#fff" />}
                {newMeal.mealType === Meal_Type.Main && <DarkBowlFoodIcon width={25} height={24} color="#fff" />}
                <div className="flex-1">
                  <input
                    className="text-xs w-full text-left font-medium tracking-[0.5px] text-white bg-background-300"
                    value={newMeal.mealName}
                    placeholder={`Add ${Object.keys(Meal_Type).find(key => Meal_Type[key as keyof typeof Meal_Type] === newMeal.mealType)} Name`}
                    onChange={e => {
                      setNewMeal({ ...newMeal, mealName: e.target.value });
                    }}
                  />
                  <TimePicker
                    value={newMeal.mealTime}
                    setValue={value => setNewMeal({ ...newMeal, mealTime: value })}
                    isDisabled={false}
                    type={"time"}
                    isActivated={(value: any) => setIsActivatedButton(value)}
                  />
                </div>
              </div>
              <div className="self-stretch gap-2 flex">
                <Button
                  onClick={() => setNewMeal(null as unknown as INewMeal)}
                  icon={<TrashIcon width={24} height={24} />}
                  className="bg-carbcodelow-600 rounded-lg flex items-center justify-center w-[45px] pl-[10px] hover:bg-carbcodelow-400"
                  overrideClassName
                />
                <Button
                  disabled={isActivatedButton ? false : true}
                  variant="default"
                  onClick={confirmAddNewMeal}
                  text="Save"
                  className="w-full text-white font-medium flex-1 tracking-[0.5px] text-xs"
                />
              </div>
            </div>
          )}
          {selectedDate === date && showMealModal ? (
            <div className="flex gap-2" ref={mealRef}>
              <div
                className="flex h-[47px] p-2 justify-center items-center gap-1 flex-1 rounded-lg border-[1.5px] border-activeblue-100 hover:bg-activeblue-100"
                onClick={() => {
                  addNewMeal(Meal_Type.Main);
                }}
              >
                <DarkBowlFoodIcon height={16} width={16} color="white" />
                <span className="text-white font-normal text-xxs tracking-[0.5px] capitalize">Main</span>
              </div>
              <div
                className="flex h-[47px] p-2 justify-center items-center gap-1 flex-1 rounded-lg border-[1.5px] border-blue3-100 hover:bg-blue3-100 group"
                onClick={() => {
                  addNewMeal(Meal_Type.Snack);
                }}
              >
                <CookieIcon height={16} width={16} className="cookie-icon" />
                <span className="text-white font-normal text-xxs tracking-[0.5px] capitalize group-hover:text-black">Snack</span>
              </div>
            </div>
          ) : hoverDay ? (
            <div className="flex justify-between space-x-4">
              <button
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  setShowActivityModal(true);
                  setDate(date);
                  e.stopPropagation();
                }}
                className="w-1/2 h-10 bg-background-500 border hover:bg-activeblue-100 border-activeblue-100 rounded-lg flex justify-center items-center"
              >
                <PlusIcon width={18} height={18} />
              </button>
              <button
                disabled={checkNoteAvailability}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  setModal(true);
                  setDate(date);
                  e.stopPropagation();
                }}
                className={clsx(
                  checkNoteAvailability &&
                    "w-1/2 h-10 bg-background-500 border border-activeblue-100 rounded-lg flex justify-center items-center",
                  !checkNoteAvailability &&
                    "w-1/2 h-10 bg-background-500 hover:bg-lightgrey2-700 border border-lightgrey2-700 rounded-lg flex justify-center items-center",
                )}
              >
                <AddNote />
              </button>
              <button
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  setShowMealModal(true);
                  setDate(date);
                  e.stopPropagation();
                }}
                className="w-1/2 h-10 bg-background-500 border hover:bg-carbcodehigh-600 border-carbcodehigh-600 rounded-lg flex justify-center items-center"
              >
                <SvgForkKnifeIcon width={24} height={24} />
              </button>
            </div>
          ) : null}
          {!isEmpty(meals) && <div className="my-4" />}
        </div>
      </div>
    </div>
  );
}
