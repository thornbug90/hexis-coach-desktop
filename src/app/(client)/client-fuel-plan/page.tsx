"use client";
import { useEffect, useState } from "react";
import CarbCodesContainer from "hexis/components/carbCodesContainer";
import dayjs from "dayjs";
import { SectionHeader } from "@components/header/header";
import { CARB_CODING } from "hexis/constants/carbCoding";
import CarbsModal from "hexis/components/carbsModal";
import LoadingComponent from "hexis/components/common/loading";
import isEmpty from "lodash/isEmpty";
import { useDispatch } from "react-redux";
import { setCurrentSelectedDay, setSelectedClient } from "hexis/state/user/slice";
import { IMeal } from "hexis/state/user/types";
import { useAppSelector } from "hexis/hooks/useRedux";
import EmptyCarbCode from "./components/empty-carb-code";
import { useSearchParams } from "next/navigation";
import AddNoteModal from "./components/add-note-modal";
import DayNoteModal from "./components/day-note-modal";
import ChooseActivityModal from "./components/choose-activity-modal";
import UpdateNoteModal from "./components/update-note-modal";
import { isCoach } from "hexis/utils/entitlementsChecker";
import AddWorkoutModal from "./components/add-workout-modal";

import { useQuery } from "@tanstack/react-query";
import { getAllActiveClients } from "hexis/lib/graphql-client";

import { Workout } from "hexis/generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

interface Props {
  searchParams?: { startDate: string; endDate: string };
}

const Page = ({ searchParams }: Props) => {
  const searchParamsHook = useSearchParams();
  if (!searchParams || !searchParams.startDate) {
    const startDate = searchParamsHook?.get("startDate");
    const endDate = searchParamsHook?.get("endDate");

    if (startDate && endDate) searchParams = { startDate: startDate, endDate: endDate };
  }
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [showModal, setModal] = useState<boolean>(false);
  const [showDayNoteModal, setShowDayNoteModal] = useState<boolean>(false);
  const [showActivityModal, setShowActivityModal] = useState<boolean>(false);
  const [showMealModal, setShowMealModal] = useState<boolean>(false);
  const [showAddWorkoutModal, setAddWorkoutModal] = useState<boolean>(false);
  const [workoutEditItem, setWorkoutEditItem] = useState<Maybe<Workout>>();
  const [content, setContent] = useState<{
    id: string;
    title: string;
    body: string;
    dayNoteDay: string;
    utcOffset: number;
    alertNotification: boolean;
  }>({
    id: "",
    title: "",
    body: "",
    dayNoteDay: "",
    utcOffset: 0,
    alertNotification: false,
  });
  const [date, setDate] = useState<string>("");
  const [activityId, setActivityId] = useState("");

  const { fuelPlanView, selectedClient, selectedClientDay, loading, user } = useAppSelector(
    ({
      user: { selectedClient, selectedClientDay, loading, currentSelectedDay, startDate, endDate, user },
      carbCoding: { fuelPlanView },
    }) => ({
      selectedClient,
      fuelPlanView,
      selectedClientDay,
      loading,
      currentSelectedDay,
      startDate,
      endDate,
      user,
    }),
  );
  console.log({ selectedClientDay });
  let coachStatus = false;
  if (user) coachStatus = isCoach(user);
  const { data } = useQuery({ queryKey: ["getAllActiveClients"], queryFn: () => getAllActiveClients() });
  useEffect(() => {
    if (data?.getMyChildren[0]) {
      let selected = data?.getMyChildren.filter((client: any) =>
        selectedClient?.customerId
          ? client?.customerId === (selectedClient as any)?.customerId
          : client?.id === (selectedClient as any)?.id,
      );
      dispatch(setSelectedClient((selected as any)[0]));
    }
  }, [data?.getMyChildren, dispatch]);
  const setCurrentDay = (date: string) => {
    const currentDay = selectedClientDay?.filter(day => day?.date === date)?.[0];
    dispatch(setCurrentSelectedDay(currentDay));
    setVisible(true);
  };
  return (
    <>
      <ChooseActivityModal
        setShowActivityModal={setShowActivityModal}
        showActivityModal={showActivityModal}
        setShowAddWorkoutModal={setAddWorkoutModal}
        setActivityId={setActivityId}
      />
      <AddWorkoutModal
        setAddWorkoutModal={setAddWorkoutModal}
        showAddWorkoutModal={showAddWorkoutModal}
        date={date}
        activityId={activityId}
        athleteId={selectedClient?.id}
        editItem={workoutEditItem}
        setWorkoutEditItem={setWorkoutEditItem}
      />
      {coachStatus ? (
        <UpdateNoteModal setModal={setShowDayNoteModal} showModal={showDayNoteModal} content={content} />
      ) : (
        <DayNoteModal setShowDayNoteModal={setShowDayNoteModal} showDayNoteModal={showDayNoteModal} content={content} />
      )}
      <AddNoteModal setModal={setModal} showModal={showModal} date={date} />
      <div className="w-full min-h-screen h-full p-10 overflow-y-auto bg-background-500">
        <SectionHeader dateRange={searchParams} />
        {loading && <LoadingComponent />}

        {!loading && !isEmpty(selectedClientDay) && (
          <div className="flex flex-row overflow-x-visible border border-lightgrey1-600 border-opacity-10 border-b-0 rounded-t-xl">
            {selectedClientDay &&
              selectedClientDay.map((day, id) => {
                const selectedDate = day?.date || dayjs().format();

                const beforeCreation: boolean = dayjs(selectedDate).isBefore(selectedClient?.onboardingComplete);

                return day?.macros !== null ? (
                  <CarbCodesContainer
                    key={id}
                    dayId={day?.dayNutrition?.id!}
                    columnNumber={++id}
                    onClick={() => setCurrentDay(selectedDate)}
                    setModal={setModal}
                    setShowDayNoteModal={setShowDayNoteModal}
                    setAddWorkoutModal={setAddWorkoutModal}
                    setShowActivityModal={setShowActivityModal}
                    setShowMealModal={setShowMealModal}
                    setWorkoutEditItem={setWorkoutEditItem}
                    setActivityId={setActivityId}
                    showModal={showModal}
                    showDayNoteModal={showDayNoteModal}
                    showMealModal={showMealModal}
                    setContent={setContent}
                    date={dayjs(day?.date).format()}
                    selectedDate={date}
                    setDate={setDate}
                    calories={`${day?.macros?.energy ? Math.round(day.macros.energy) : "-"}`}
                    carbohydrates={`${day?.macros?.carb ? Math.round(day.macros.carb) : "-"}`}
                    protein={`${day?.macros?.protein ? Math.round(day.macros.protein) : "-"}`}
                    fat={`${day?.macros?.fat ? Math.round(day.macros.fat) : "-"}`}
                    tracked={fuelPlanView === CARB_CODING.TRACKED_VIEW}
                    meals={day?.meals as unknown as IMeal[]}
                    macros={day?.macros}
                    workouts={day?.workouts as any}
                    mainHighMax={day?.carbRanges?.mainRange.highMax}
                    mainHighMin={day?.carbRanges?.mainRange.highMin}
                    mainMedMax={day?.carbRanges?.mainRange.medMax}
                    mainMedMin={day?.carbRanges?.mainRange?.medMin!}
                    mainLowMax={day?.carbRanges?.mainRange.lowMax}
                    mainLowMin={day?.carbRanges?.mainRange.lowMin}
                    snackHighMax={day?.carbRanges?.snackRange.highMax}
                    snackHighMin={day?.carbRanges?.snackRange.highMin}
                    snackMedMax={day?.carbRanges?.snackRange.medMax}
                    snackMedMin={day?.carbRanges?.snackRange?.medMin!}
                    snackLowMax={day?.carbRanges?.snackRange.lowMax}
                    snackLowMin={day?.carbRanges?.snackRange.lowMin}
                    beforeCreation={beforeCreation}
                    intraFuelling={day?.intraFuellingRecommendations}
                  />
                ) : (
                  <EmptyCarbCode key={id} date={dayjs(day?.date).format()} beforeCreation={beforeCreation} />
                );
              })}
          </div>
        )}

        {!loading && isEmpty(selectedClientDay) && (
          <div className="flex flex-col gap-4 w-full h-[85vh] justify-center items-center">
            <div className="text-2xl">Data is currently unavailable</div>
            <div className="text-xl">Please advise your client to complete the onboarding in app</div>
          </div>
        )}
      </div>
      {visible && <CarbsModal visible={visible} onClose={() => setVisible(false)} />}
    </>
  );
};

export default Page;
