"use client";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "hexis/hooks/useRedux";
import {
  Child,
  Goal,
  MealTemplate,
  MealTemplateInput,
  MutationUpdateMealplanArgs,
  Sex,
  Total_Activity_Duration,
  UpdateMealplanMutation,
} from "hexis/generated/graphql";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateMealplan, userById } from "hexis/lib/graphql-client";
import { useEffect } from "react";
import { setSelectedClient } from "hexis/state/user/slice";
import isEmpty from "lodash/isEmpty";
import activities from "hexis/constants/activities";
import EnvelopeIcon from "hexis/components/icons/general/EnvelopeIcon";
import Ellipse from "hexis/components/icons/general/Ellipse";
import CakeIcon from "hexis/components/icons/general/CakeIcon";
import MapPinIcon from "hexis/components/icons/general/MapPinIcon";
import BasicSettings from "./components/BasicSettings";
import { convertEnumValue } from "hexis/utils/common";
import { InfoIcon } from "hexis/components/icons/general";
import MealPatterns from "./components/MealPatterns";
import clsx from "clsx";
import PersonalisedNutrition from "./components/PersonalisedNutrition";
import UpgradeToEditModal from "./components/UpgradeToEditModal";
import { formatTimeHourMinute } from "hexis/utils/dates";
import SpinIcon from "hexis/components/icons/general/SpinIcon";

export interface IProfileProps {
  [key: string]: any;
  name: string;
  sex: Sex;
  dateOfBirth: string;
  height: number;
  timeZone: string;
  goal: Goal;
  currentWeight: number;
  targetWeight: number;
  bodyFat: string;
  skinfolds: string;
  primarySport: string;
  regularWorkout: string[];
  workoutHoursPerWeek: Total_Activity_Duration;
  efficiency: string;
}

export interface INutritionProps {
  formula: string;
  rmr: number;
  thermogenesis: number;
  proteinConstant: number;
  activityLevel: string;
  pal: number;
  weight: number;
  wakeUpTime: string;
  bedTime: string;
  mainCarbCodeHighName: string;
  mainCarbCodeHighFrom: number;
  mainCarbCodeHighTo: number;
  mainCarbCodeMediumName: string;
  mainCarbCodeMediumFrom: number;
  mainCarbCodeMediumTo: number;
  mainCarbCodeLowName: string;
  mainCarbCodeLowFrom: number;
  mainCarbCodeLowTo: number;
  snackCarbCodeHighName: string;
  snackCarbCodeHighFrom: number;
  snackCarbCodeHighTo: number;
  snackCarbCodeMediumName: string;
  snackCarbCodeMediumFrom: number;
  snackCarbCodeMediumTo: number;
  snackCarbCodeLowName: string;
  snackCarbCodeLowFrom: number;
  snackCarbCodeLowTo: number;
}

type ProfileComponent = {
  component: React.ComponentType<any>;
  props: any;
};

export default function Profile() {
  const { selectedClient } = useAppSelector(({ user: { selectedClient } }) => ({
    selectedClient,
  }));

  const { mutateAsync: updateMealPlanM, isLoading: updateMealPlanLoading } = useMutation({
    mutationKey: ["updateMealPlan"],
    mutationFn: (args: MutationUpdateMealplanArgs) => updateMealplan({ clientId: args.clientId, input: args.input }),
    onSuccess: (_: UpdateMealplanMutation) => {},
  });
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState("" as string);
  const [profile, setProfile] = useState({} as IProfileProps);
  const [mealPlan, setMealPlan] = useState([] as MealTemplate[]);
  const [nutrition, setNutrition] = useState({} as INutritionProps);
  const [show, setShow] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeNav, setActiveNav] = useState(0);
  const currentMealPlanRef = useRef(mealPlan);
  const updateMealPlanRef = useRef(mealPlan);
  // refetch to get latest user data
  const { data: selectedUser } = useQuery({
    queryKey: ["getSelectedUser"],
    queryFn: () => userById({ id: selectedClient?.id }),
    cacheTime: 0,
    notifyOnChangeProps: "all",
  });

  useEffect(() => {
    if (selectedUser && !isEmpty(selectedUser?.userById)) {
      const client = selectedUser.userById;
      dispatch(setSelectedClient(client as Child));
    }
  }, [selectedUser, dispatch, selectedClient]);

  useEffect(() => {
    if (selectedClient) {
      const {
        id,
        firstName,
        lastName,
        sex,
        dob,
        height,
        goal,
        weight,
        targetWeight,
        totalActivityDuration,
        favouriteActivities,
        sleepTime,
        wakeTime,
        Efficiency,
        RMR,
        proteinConstant,
        timezone,
        mealplan: meals,
        carbRanges: carbRangeData,
      } = selectedClient;
      const {
        mainRange: {
          lowMin: mainLowMin,
          lowMax: mainLowMax,
          medMin: mainMedMin,
          medMax: mainMedMax,
          highMin: mainHighMin,
          highMax: mainHighMax,
        },
        snackRange: {
          lowMin: snackLowMin,
          lowMax: snackLowMax,
          medMin: snackMedMin,
          medMax: snackMedMax,
          highMin: snackHighMin,
          highMax: snackHighMax,
        },
      } = carbRangeData || {
        mainRange: {
          lowMin: 0,
          lowMax: 0,
          medMin: 0,
          medMax: 0,
          highMin: 0,
          highMax: 0,
        },
        snackRange: {
          lowMin: 0,
          lowMax: 0,
          medMin: 0,
          medMax: 0,
          highMin: 0,
          highMax: 0,
        },
      };
      const primarySport = favouriteActivities?.find(activity => activity?.primary === true)?.activity?.id;
      const regularWorkout = favouriteActivities?.filter(activity => activity?.primary === false).map(activity => activity?.activity?.id);
      const mealPlan = meals?.meals.map(meal => ({
        ...meal,
        time: formatTimeHourMinute(meal?.time),
      })) as MealTemplate[];
      currentMealPlanRef.current = mealPlan;
      updateMealPlanRef.current = mealPlan;
      setMealPlan(mealPlan || []);
      setUserId(id);
      setProfile({
        name: `${firstName} ${lastName}`,
        sex: convertEnumValue(sex) as Sex,
        dateOfBirth: dayjs(dob).format("DD/MM/YYYY"),
        height: height as number,
        timeZone: timezone as string,
        goal: convertEnumValue(goal) as Goal,
        currentWeight: weight as number,
        targetWeight: targetWeight as number,
        bodyFat: "Coming Soon",
        skinfolds: "Coming Soon",
        primarySport: primarySport as string,
        regularWorkout: regularWorkout as string[],
        workoutHoursPerWeek: totalActivityDuration as Total_Activity_Duration,
        efficiency: (Efficiency as unknown as string) || "21.7%",
      });
      setNutrition({
        formula: "Mifflin St. Jeor (1990)",
        rmr: Math.round(RMR || 0),
        thermogenesis: 10,
        proteinConstant: parseFloat((proteinConstant || 0).toFixed(2)),
        activityLevel: "Sedentary",
        pal: 1.2,
        weight: weight ?? targetWeight ?? 1,
        wakeUpTime: wakeTime ? `${String(wakeTime).split(":")[0]}:${String(wakeTime).split(":")[1]}` : "00:00",
        bedTime: sleepTime ? `${String(sleepTime).split(":")[0]}:${String(sleepTime).split(":")[1]}` : "00:00",
        mainCarbCodeHighName: "High",
        mainCarbCodeHighFrom: mainHighMin,
        mainCarbCodeHighTo: mainHighMax,
        mainCarbCodeMediumName: "Medium",
        mainCarbCodeMediumFrom: mainMedMin ?? 0,
        mainCarbCodeMediumTo: mainMedMax,
        mainCarbCodeLowName: "Low",
        mainCarbCodeLowFrom: mainLowMin,
        mainCarbCodeLowTo: mainLowMax,
        snackCarbCodeHighName: "High",
        snackCarbCodeHighFrom: snackHighMin,
        snackCarbCodeHighTo: snackHighMax,
        snackCarbCodeMediumName: "Medium",
        snackCarbCodeMediumFrom: snackMedMin ?? 0,
        snackCarbCodeMediumTo: snackMedMax,
        snackCarbCodeLowName: "Low",
        snackCarbCodeLowFrom: snackLowMin,
        snackCarbCodeLowTo: snackLowMax,
      });
    }
  }, [selectedClient, selectedClient?.id]);

  useEffect(() => {
    updateMealPlanRef.current = mealPlan;
    if (JSON.stringify(updateMealPlanRef.current.filter(item => item.time !== "00:00")) !== JSON.stringify(currentMealPlanRef.current)) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [mealPlan]);

  const updateMealAction = async () => {
    setMealPlan(updateMealPlanRef.current);
    currentMealPlanRef.current = updateMealPlanRef.current;
    const updateMealPlanItems: MealTemplateInput[] =
      updateMealPlanRef.current
        ?.filter(meal => meal.dayName && meal.time !== "00:00")
        ?.map(meal => ({
          mealName: meal.mealName,
          time: `${meal.time}:00.000Z`,
          dayName: meal.dayName,
          mealType: meal.mealType,
          mealSubType: meal.mealSubType,
        })) || [];
    if (updateMealPlanItems.length > 0) {
      await updateMealPlanM({
        input: {
          meals: updateMealPlanItems,
        },
        clientId: userId,
      });
    }
    setShow(false);
  };

  const discardMealUpdates = () => {
    setMealPlan(currentMealPlanRef.current);
    updateMealPlanRef.current = currentMealPlanRef.current;
    setShow(false);
  };

  const SportIcon = ({ Icon, index }: { Icon: any; index: number }) => {
    return (
      <div
        className={clsx("flex", "w-10", "h-10", "flex-col", "justify-center", "items-center", "rounded-full", {
          "bg-activeblue-100/60": index === 0,
          "bg-activeblue-100/80": index === 1,
          "bg-activeblue-100": index !== 0 && index !== 1,
        })}
      >
        {Icon && <Icon color="#fff" width={20} height={20} />}
      </div>
    );
  };
  const favouriteSportsIcons = selectedClient?.favouriteActivities
    ?.slice(0, 3)
    .reverse()
    .map((activity, index) => {
      const Icon = activities[activity?.activity?.id as keyof typeof activities]?.icon;
      return (
        <div key={index} className={`absolute ${index == 1 ? "left-5" : index == 2 ? "left-10" : ""} top-0 h-10 w-10`}>
          <SportIcon Icon={Icon} index={index} />
        </div>
      );
    });

  const profileComponents: ProfileComponent[] = [
    {
      component: BasicSettings,
      props: { profile, setProfile },
    },
    {
      component: MealPatterns,
      props: { mealPlan, setMealPlan },
    },
    {
      component: PersonalisedNutrition,
      props: { nutrition, setNutrition },
    },
  ];

  const ActiveComponent: React.ComponentType<any> = profileComponents[activeNav].component;
  const activeComponentProps: any = profileComponents[activeNav].props;
  const navTitles = ["Basic Settings", "Meal Patterns", "Personalised Nutrition"];
  const navItemClasses = {
    base: "cursor-pointer flex py-2 px-4 justify-center text-white items-center gap-2.5 text-sm rounded-full font-medium tracking-[0.7px]",
    active: "bg-lightgrey1-600 bg-opacity-20",
  };

  const NavItem = ({ title, index }: { title: string; index: number }) => (
    <div onClick={() => setActiveNav(index)} className={`${navItemClasses.base} ${index === activeNav ? navItemClasses.active : ""}`}>
      {title}
    </div>
  );

  return (
    <>
      <UpgradeToEditModal show={showUpgradeModal} setShow={setShowUpgradeModal} />
      <div className="flex-1 w-full bg-background-500 overflow-y-scroll">
        <div
          style={{
            backgroundImage: "url('/images/profile-header.png')",
          }}
          className="relative w-full h-60 mb-[60px]"
        >
          <div className="absolute flex bottom-[-60px] left-[160px] w-[900px] pt-[30px] pr-[40px] pb-[40px] pl-[150px] flex-col items-start gap-3 rounded-xl bg-background-300 ">
            <div className="flex justify-between items-start self-stretch gap-3">
              <div className="flex w-[470.5px] items-end gap-3">
                <span className="text-white font-semibold text-[32px] tracking-[0.5px]">{`${selectedClient?.firstName} ${selectedClient?.lastName}`}</span>
                <div className="flex pb-[6px] flex-col items-end gap-[10px]">
                  {/*                   <div className="flex py-1 px-2 items-start gap-[10px] bg-background-900 rounded">
                    <span className="text-white font-medium text-[14px] tracking-[0.7px] capitalize">Essential</span>
                  </div> */}
                </div>
              </div>
              <div className="w-20 h-10 relative">{favouriteSportsIcons}</div>
            </div>
            <div className="flex gap-3 opacity-80">
              <div className="flex items-center gap-2">
                <EnvelopeIcon />
                <span className="text-white font-medium text-base tracking-[0.7px]">{selectedClient?.email}</span>
              </div>
              <div className="flex items-center justify-center">
                <Ellipse />
              </div>
              <div className="flex items-center gap-2">
                <CakeIcon />
                <span className="text-white font-medium text-base tracking-[0.7px]">{dayjs(selectedClient?.dob).format("D MMM YYYY")}</span>
              </div>
              <div className="flex items-center justify-center">
                <Ellipse />
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon />
                <span className="text-white font-medium text-base tracking-[0.7px]">{selectedClient?.timezone || "Europe/London"}</span>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundImage: "url('/images/profile-pic.png')",
              backgroundSize: "cover",
              position: "absolute",
              left: "160px",
              transform: "translate(-50%, 25%)",
            }}
            className="w-60 h-60 rounded-full"
          ></div>
        </div>

        <div className="flex p-10 flex-col items-start gap-8 self-stretch">
          <div className="flex relative justify-between items-center w-full  border-b border-lightgrey1-600 border-opacity-10">
            <div className="flex h-12 pb-4 items-center gap-6 self-stretch">
              {navTitles.map((title, index) => (
                <NavItem key={index} title={title} index={index} />
              ))}
            </div>
            {activeNav !== 1 && (
              <div
                onClick={() => setShowUpgradeModal(true)}
                className="absolute right-0 -top-2 cursor-pointer flex py-3 px-6 justify-center gap-2.5 rounded-[10px] border-activeblue-100 hover:bg-activeblue-100 border shadow-[0px 1px 3px 0px rgba(16, 24, 40, 0.20), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)]"
              >
                <span className="text-center font-medium text-sm tracking-[0.7px] capitalize">Upgrade to Edit</span>
              </div>
            )}
          </div>
          <ActiveComponent {...activeComponentProps} />

          {show && (
            <div className="flex py-3 pr-3 pl-6 flex-row justify-center items-center gap-2 self-stretch rounded-lg bg-lightgrey2-700 shadow-[0px 1px 3px 0px rgba(16, 24, 40, 0.20), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)]">
              <div className="cursor-pointer">
                <InfoIcon width={20} height={20} color="#fff" />
              </div>
              <span className="flex-1 text-lightgrey1-700 text-base tracking-[0.25px] font-regular">
                You have unsaved changes. Would you like to save and update now?
              </span>
              <div className="flex gap-2 h-10">
                <div
                  className="flex px-6 py-3 justify-center items-center gap-2.5 rounded-[10px] border-[1px] border-activeblue-100 cursor-pointer"
                  onClick={discardMealUpdates}
                >
                  <span className="text-white font-normal text-center tracking-[0.7px]">Discard Changes</span>
                </div>

                <div
                  className="flex px-6 py-3 justify-center items-center gap-2.5 rounded-[10px] bg-activeblue-100 border-activeblue-100 cursor-pointer min-w-[162px]"
                  onClick={() => !updateMealPlanLoading && updateMealAction()}
                >
                  {updateMealPlanLoading && <SpinIcon />}
                  {!updateMealPlanLoading && (
                    <span className="text-white font-normal text-center tracking-[0.7px] whitespace-nowrap">Save & Update</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
