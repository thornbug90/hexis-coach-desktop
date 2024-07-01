"use client";

// WorkoutSection containing the wearable, competition, performance, activity, intensity, start time and end time
import React, { useState, useEffect } from "react";
import { IntraFuellingRecommendation, Workout } from "hexis/generated/graphql";
import activities from "hexis/constants/activities";
import { KeyPerformanceIcon, TrophyIcon, WearableConfirmedIcon, WearableUnconfirmedIcon } from "hexis/components/icons/general";
import IntraWorkoutBlueIcon from "hexis/components/icons/sports/IntraWorkoutBlueIcon";
import IntraWorkoutRedIcon from "hexis/components/icons/sports/IntraWorkoutRedIcon";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getFoodLog } from "hexis/lib/graphql-client";
import currency from "currency.js";
import BarChartIcon from "hexis/components/icons/general/BarChartIcon";
import clsx from "clsx";
import { truncate } from "hexis/utils/truncate";
import integrationIcons, { IIntergrationIcon } from "hexis/lib/integrations";
import QuestionIcon from "hexis/components/icons/general/QuestionIcon";
import identifyWorkout from "hexis/utils/identifyWorkout";
import { intensityMapping } from "hexis/lib/intensity";
import { Workout_Unit } from "hexis/constants/user";
type Props = {
  workout: Workout;
  tracked?: boolean;
  trackedTime?: string | undefined;
  intraFuelling?: IntraFuellingRecommendation | null;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const WorkoutTracker = ({ workout, tracked, trackedTime, intraFuelling, onClick }: Props) => {
  const { icon: Icon, name = null } = activities?.[workout.activity.id as keyof typeof activities] || [];

  const [fatTracked, setFatTracked] = useState(0);
  const [caloriesTracked, setCaloriesTracked] = useState(0);
  const [proteinTracked, setProteinTracked] = useState(0);
  const [carbsTracked, setCarbsTracked] = useState(0);
  const workoutDurationInHours = currency(dayjs(workout?.end).diff(workout.start, "minutes")).divide(60).value;

  const { isActualWorkout, isWearableWorkout, isIncompletedWorkout } = identifyWorkout();
  const { data } = useQuery({
    queryKey: ["getFoodLog", workout?.intraFuellingMeal?.mealVerification?.id],
    queryFn: () =>
      getFoodLog({
        verificationId: workout?.intraFuellingMeal?.mealVerification?.id || "",
      }),
    enabled: !!workout.intraFuellingMeal,
  });
  const wearableIcon = integrationIcons.find((item: IIntergrationIcon) => item.src === workout?.source);
  const correspondingBetweenTimes = (time1: Date | string, time2: Date | string) => {
    return new Date(time1)?.getHours() === new Date(time2)?.getHours() && new Date(time1)?.getMinutes() === new Date(time2)?.getMinutes();
  };
  const workoutIntensity = (intensityRPE: number) => {
    const intenstiyValueArray = Object.keys(intensityMapping).map(Number).reverse();
    for (const intensityValue of intenstiyValueArray) {
      if (intensityRPE >= intensityValue) {
        return intensityMapping[intensityValue as keyof typeof intensityMapping];
      }
    }
    return; // Adding this since the function can get to the end without a match.
  };
  useEffect(() => {
    if (data) {
      let kcals = 0;
      let carbs = 0;
      let protein = 0;
      let fats = 0;

      const foodObjects = data?.foodLog?.foodObjects;
      const portions = data?.foodLog?.portions;
      const quantities = data?.foodLog?.quantities;

      foodObjects &&
        foodObjects.forEach((foodObject, index) => {
          const foodEnergy = foodObject?.nutrients.find(i => i?.slug == "Energy");
          const foodMacros = foodObject?.nutrients.find(i => i?.slug == "Macronutrients");

          const foodKcalsPer100g = foodEnergy?.nutrients?.find(value => value?.slug === "energyKcal");

          const foodCarbsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "carbohydrate");

          const foodProteinsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "protein");

          const foodFatsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "fat");

          const foodKcals = currency(foodKcalsPer100g?.value || "")
            .multiply(currency(portions[index]?.value || ""))
            .multiply(currency(quantities[index] || ""))
            .divide(100);

          const foodCarbs = currency(foodCarbsPer100g?.value || "")
            .multiply(currency(portions[index]?.value || ""))
            .multiply(currency(quantities[index] || ""))
            .divide(100);
          const foodProteins = currency(foodProteinsPer100g?.value || "")
            .multiply(currency(portions[index]?.value || ""))
            .multiply(currency(quantities[index] || ""))
            .divide(100);
          const foodFats = currency(foodFatsPer100g?.value || "")
            .multiply(currency(portions[index]?.value || ""))
            .multiply(currency(quantities[index] || ""))
            .divide(100);

          kcals += foodKcals.value;
          carbs += foodCarbs.value;
          protein += foodProteins.value;
          fats += foodFats.value;
        });

      setCarbsTracked(carbs);
      setProteinTracked(protein);
      setCaloriesTracked(kcals);
      setFatTracked(fats);
    }
  }, [data]);

  return (
    <div className="bg-background-300 w-full min-h-12 my-3 rounded-lg cursor-pointer hover:drop-shadow-4xl" onClick={onClick}>
      <div className="w-full p-2 rounded-md flex flex-col gap-2 justify-between">
        <div className="flex items-center gap-2">
          <div>{Icon && <Icon color="#359CEF" width={16} height={16} />}</div>
          <h3 className="text-xs font-medium tracking-[0.25px]">{workout?.title ?? name}</h3>
        </div>

        {workout?.description && <p className="text-xxs tracking-[0.15px] font-normal">{truncate(workout.description, 50, 50)}</p>}
        <div className={`flex justify-${wearableIcon ? "between" : "start"} items-center`}>
          <div className="flex tracking-[0.25px] gap-1 font-medium text-xxs w-full items-center justify-between">
            <div>
              {((isWearableWorkout(workout) && workout?.startTime) || !isWearableWorkout(workout)) &&
                !correspondingBetweenTimes(workout?.start, workout?.end) && (
                  <>
                    <span className="mr-1">{dayjs(workout.start).utc().format("HH:mm")}</span>
                    <span className="mr-1">-</span>
                    <span className="mr-1">{dayjs(workout.end).utc().format("HH:mm")}</span>
                  </>
                )}
            </div>
            <div className="flex">
              {isIncompletedWorkout(workout) && (
                <div className="h-5 w-5 flex justify-center items-center rounded-[4px] border-1 border-red bg-[#F39EAD] ml-auto mr-2">
                  <QuestionIcon />
                </div>
              )}
              {wearableIcon && (
                // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                <img src={wearableIcon?.icon} width={20} height={20} className={"rounded-[4px]"} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx("flex flex-col gap-2 p-2 bg-background-400", {
          "rounded-b-lg": !tracked || (tracked && !workout.intraFuellingMeal),
        })}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-[10px] h-6">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-semibold">{workoutIntensity(workout?.intensityRPE ?? 0)}</p>

              <BarChartIcon opacity2={workout?.intensityRPE! >= 33 ? "1" : "0.3"} opacity3={workout?.intensityRPE! >= 60 ? "1" : "0.3"} />
            </div>

            {workout.key && <KeyPerformanceIcon color={"#FFFFFF"} width={18} height={20} />}

            {workout.competition && <TrophyIcon color={"#FFFFFF"} width={18} height={20} />}
          </div>
          <div className="flex">
            {workout?.intraFuelling && <IntraWorkoutBlueIcon width={18} height={25} />}
            {workout?.intraFuellingPrompt && !workout?.intraFuelling && <IntraWorkoutRedIcon width={18} height={25} />}
            {isActualWorkout(workout) && (
              <>
                {workout.confirmed ? <WearableConfirmedIcon width={18} height={25} /> : <WearableUnconfirmedIcon width={18} height={25} />}
              </>
            )}
          </div>
        </div>

        {workout?.intraFuelling && (
          <p className="text-xs font-medium border border-activeblue-100 bg-background-300 text-center rounded-md p-1">
            {intraFuelling?.unit === Workout_Unit.GRAMS_PER_HOURS
              ? Math.round(currency(intraFuelling?.carb || 0).divide(workoutDurationInHours).value || 0)
              : Math.round(currency(intraFuelling?.carb || 0)?.value)}{" "}
            {intraFuelling?.unit}
          </p>
        )}
      </div>

      {workout?.intraFuellingMeal && (
        <>
          {tracked && workout?.intraFuellingMeal?.mealVerification?.skipped && (
            <div>
              <div className="p-2">Skipped</div>
            </div>
          )}

          {tracked && workout?.intraFuellingMeal?.mealVerification?.id && !workout?.intraFuellingMeal?.mealVerification?.skipped && (
            <div className="flex flex-col gap-1 w-full p-2 rounded-b-lg text-xxs font-light">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{Math.round(caloriesTracked || 0)} Kcal</p>
                <p>{trackedTime}</p>
              </div>

              <div className="flex items-center justify-between">
                <p>{`${Math.round(carbsTracked || 0)} g`} C</p>

                <span className="font-bold">.</span>

                <p>{`${Math.round(proteinTracked || 0)} g`} P</p>

                <span className="font-bold">.</span>

                <p>{`${Math.round(fatTracked || 0)} g`} F</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WorkoutTracker;
