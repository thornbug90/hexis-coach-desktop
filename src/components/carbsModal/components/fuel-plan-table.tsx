"use client";
import React, { useEffect, useState } from "react";
import { IMealVerification } from "hexis/state/user/types";
import {
  LightIntensityIcon,
  ModerateIntensityIcon,
  HardIntensityIcon,
  KeyPerformanceIcon,
  TrophyIcon,
  WearableConfirmedIcon,
} from "hexis/components/icons/general";
import activities from "hexis/constants/activities";
import { CARB_CODE, WORKOUT_INTENSITY, WORKOUT_SOURCE, Workout_Unit, workoutIntesity } from "hexis/constants/user";
import currency from "currency.js";
import { CarbRange, Carb_Code, FoodLog, IntraFuellingRecommendation } from "hexis/generated/graphql";
import IntraWorkoutBlueIcon from "hexis/components/icons/sports/IntraWorkoutBlueIcon";
import IntraWorkoutRedIcon from "hexis/components/icons/sports/IntraWorkoutRedIcon";
import { isBetween } from "hexis/utils/common";
import { getLiteralDateString } from "hexis/utils/dates";
import dayjs from "dayjs";

export interface ITrackedFoodItems {
  item: string;
  quantity: string;
  portion: string;
  calories: string;
  carbs: string;
  protein: string;
  fat: string;
}

export interface ITotalTrackedMeal {
  totalTrackedCalories: string;
  totalTrackedCarbs: string;
  totalTrackedProtein: string;
  totalTrackedFat: string;
}

export interface IFuelPlan {
  trackedCarbsCode?: CARB_CODE | Carb_Code;
  plannedCarbsCode?: string;
  plannedTime?: string;
  trackedTime?: string;
  mealTargetKcal?: string;
  mealName?: string;
  carbRange?: CarbRange;
  skipped?: boolean;
  skippedTime?: string;
  training?: boolean;
  mealVerification?: IMealVerification;
  data?: FoodLog;
  intensity?: string;
  activity?: {
    id: string;
    name: string;
    slug: string;
  };
  workoutStart?: string;
  workoutEnd?: string;
  competition?: boolean;
  workoutCalories?: number;
  workoutSource?: string;
  workoutKeyPerformance?: boolean;
  intraFuelling?: boolean;
  intraFuellingPrompt?: boolean;
  intraFuellingRecommendations?: IntraFuellingRecommendation;
}

export default function FuelPlanTable({
  plannedCarbsCode,
  plannedTime,
  mealTargetKcal,
  mealName,
  skipped,
  skippedTime,
  training,
  trackedTime,
  data,
  carbRange,
  intensity,
  activity,
  workoutStart,
  workoutEnd,
  competition,
  workoutCalories,
  workoutSource,
  workoutKeyPerformance,
  intraFuelling,
  intraFuellingPrompt,
  intraFuellingRecommendations,
}: IFuelPlan) {
  const [trackedData, setTrackedData] = useState<FoodLog | undefined>(data);

  const { icon: Icon } = activities?.[activity?.id as keyof typeof activities] || [];

  const [fatTracked, setFatTracked] = useState(0);
  const [caloriesTracked, setCaloriesTracked] = useState(0);
  const [proteinTracked, setProteinTracked] = useState(0);
  const [carbsTracked, setCarbsTracked] = useState(0);
  const trackedCarbsCode = isBetween(carbRange?.highMin, carbRange?.highMax, carbsTracked)
    ? CARB_CODE.HIGH
    : isBetween(carbRange?.medMin || 0, carbRange?.medMax, carbsTracked)
      ? CARB_CODE.MEDIUM
      : isBetween(carbRange?.lowMin, carbRange?.lowMax, carbsTracked)
        ? CARB_CODE.LOW
        : "";

  useEffect(() => {
    let kcals = 0;
    let carbs = 0;
    let protein = 0;
    let fats = 0;

    if (data) {
      const foodLog = data;
      setTrackedData(foodLog);

      const foodObjects = foodLog?.foodObjects;
      const portions = foodLog?.portions;
      const quantities = foodLog?.quantities;

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

    if (data === undefined) {
      const foodLog = data;
      setTrackedData(foodLog);

      setCarbsTracked(0);
      setProteinTracked(0);
      setCaloriesTracked(0);
      setFatTracked(0);
    }
  }, [data]);

  const trackedFoodObjects = trackedData?.foodObjects;
  const trackedFoodPortions = trackedData?.portions;
  const trackedFoodQuantities = trackedData?.quantities;

  // constants holding carbs color code values
  const plannedBorderCarbsCodeColour =
    plannedCarbsCode === CARB_CODE.LOW
      ? "border-carbcodelow-100"
      : plannedCarbsCode === CARB_CODE.MEDIUM
        ? "border-carbcodemedium-100"
        : plannedCarbsCode === CARB_CODE.HIGH
          ? "border-carbcodehigh-100"
          : training
            ? "border-activeblue-100"
            : "hidden";

  const plannedCarbsCodeColour =
    plannedCarbsCode === CARB_CODE.LOW
      ? "from-carbcodelow-100 to-carbcodelow-500"
      : plannedCarbsCode === CARB_CODE.MEDIUM
        ? "from-carbcodemedium-100 to-carbcodemedium-500"
        : plannedCarbsCode === CARB_CODE.HIGH
          ? "from-carbcodehigh-100 to-carbcodehigh-500"
          : "hidden";

  const trackedBorderCarbsCodeColour =
    trackedCarbsCode === CARB_CODE.LOW
      ? "border-carbcodelow-100"
      : trackedCarbsCode === CARB_CODE.MEDIUM
        ? "border-carbcodemedium-100"
        : trackedCarbsCode === CARB_CODE.HIGH
          ? "border-carbcodehigh-100"
          : training
            ? "border-activeblue-100"
            : "border-slate-500";

  const trackedBgCarbsCodeColour =
    trackedCarbsCode === CARB_CODE.LOW
      ? "bg-carbcodelow-100/20"
      : trackedCarbsCode === CARB_CODE.MEDIUM
        ? "bg-carbcodemedium-100/20"
        : trackedCarbsCode === CARB_CODE.HIGH
          ? "bg-carbcodehigh-100/20"
          : training
            ? "bg-activeblue-100/20"
            : "";
  const endTime = getLiteralDateString() + "T" + workoutEnd;
  const startTime = getLiteralDateString() + "T" + workoutStart;
  const workoutDurationInHours = currency(dayjs(endTime).diff(startTime, "minutes")).divide(60).value;

  return (
    <div className={`overflow-x-auto w-full border ${plannedBorderCarbsCodeColour} ${training ? "rounded-md" : "rounded-t-md"}`}>
      {training ? (
        <>
          <div className="flex justify-between bg-background-300 p-2 items-center px-3">
            <div className="flex space-x-4 items-center w-1/2">
              <div className="flex space-x-4 items-center">
                {Icon && <Icon color="#359CEF" width={25} />}
                <p>{activity?.name}</p>
              </div>

              <div className="w-1/8">{workoutKeyPerformance && <KeyPerformanceIcon color={"#FFFFFF"} />}</div>

              <div className="w-1/8">{competition && <TrophyIcon color={"#FFFFFF"} />}</div>

              <div className="w-1/4 border-l px-3">
                {workoutSource === WORKOUT_SOURCE.POINT && <p>{`${workoutCalories || "0"} Kcal`}</p>}
              </div>
            </div>
            <div className="flex space-x-2 px-3 w-[350px] justify-end">
              <div className="flex items-center justify-center w-[65px]">
                <div className=" w-1/2">
                  {intraFuelling ? (
                    <IntraWorkoutBlueIcon height={30} width={33} />
                  ) : (
                    intraFuellingPrompt && <IntraWorkoutRedIcon height={30} width={33} />
                  )}
                </div>
                <div className=" w-1/2">
                  {workoutSource === WORKOUT_SOURCE.POINT && <WearableConfirmedIcon color={"#359CEF"} height={27} width={29} />}
                </div>
              </div>

              <div className="flex space-x-3 items-center justify-end mx-4">
                <p className="font-sm">{intensity ? workoutIntesity[intensity.trim() as WORKOUT_INTENSITY] : ""}</p>
                {intensity === WORKOUT_INTENSITY.HARD && <HardIntensityIcon width={24} height={16} />}
                {intensity === WORKOUT_INTENSITY.MODERATE && <ModerateIntensityIcon width={24} height={16} />}
                {intensity === WORKOUT_INTENSITY.LIGHT && <LightIntensityIcon width={24} height={16} />}
              </div>

              <div className="text-md flex items-center justify-end w-[32%]">
                <div className="flex w-full justify-between">
                  <p>{workoutStart} </p>
                  <p>-</p>
                  <p>{workoutEnd}</p>
                </div>
              </div>
            </div>
          </div>
          {intraFuelling && intraFuellingRecommendations && (
            <div>
              <div className="bg-activeblue-100 bg-opacity-30 py-2 px-5 font-medium tracking-[0.241px] flex justify-between">
                <p className="col-span-2">Intra-Workout Fuelling</p>
                <div className="flex gap-3">
                  <p className="text-sm font-medium tracking-[0.26px]">
                    {intraFuellingRecommendations?.unit === Workout_Unit.GRAMS_PER_HOURS
                      ? Math.round(currency(intraFuellingRecommendations?.carb || 0).divide(workoutDurationInHours).value || 0)
                      : Math.round(currency(intraFuellingRecommendations?.carb || 0)?.value)}
                    {intraFuellingRecommendations.unit}
                  </p>
                  <p className="px-[6px] font-normal">|</p>

                  <p className="text-sm font-medium tracking-[0.26px]">Calories {Math.round(intraFuellingRecommendations?.energy || 0)}</p>
                  <p className="px-[6px] font-normal">|</p>

                  <p className="text-sm font-medium tracking-[0.26px]">Carbs {Math.round(intraFuellingRecommendations?.carb || 0)}g</p>
                  <p className="px-[6px] font-normal">|</p>

                  <p className="text-sm font-medium tracking-[0.26px]">Pro {Math.round(intraFuellingRecommendations?.protein || 0)}g</p>
                  <p className="px-[6px] font-normal">|</p>

                  <p className="text-sm font-medium tracking-[0.26px]">Fat {Math.round(intraFuellingRecommendations?.fat || 0)}g</p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={`flex justify-between bg-gradient-to-r p-2 ${plannedCarbsCodeColour}`}>
          <p className="pl-3">{mealName}</p>
          <div className="flex">
            <span className="border-r px-3">
              <p>{mealTargetKcal ?? ""}&nbsp;Kcal</p>
            </span>
            <span className="px-3">
              <p>{plannedTime}</p>
            </span>
          </div>
        </div>
      )}

      {skipped && !training ? (
        <div className="flex p-2 pl-5 space-x-2">
          <p className="font-semibold pt-1 text-base">Meal Skipped: </p>
          <p className="text-base pt-1">{skippedTime}</p>
        </div>
      ) : trackedTime ? (
        <div className="flex p-2 pl-4 space-x-2">
          <p className="font-semibold pt-1 text-base">Tracked: </p>
          <p className="text-base pt-1">{trackedTime || "-"}</p>
        </div>
      ) : !training ? (
        <div className="flex p-2 pl-5 space-x-2">
          <p className="font-extralight pt-1 text-base italic">No Input </p>
        </div>
      ) : null}
      {!data && training && (
        <div className="flex p-2 pl-5 space-x-2">
          <p className="font-extralight pt-1 text-base italic">No Input </p>
        </div>
      )}

      <table className="table border-separate border-spacing-0 w-full">
        {/* body */}
        {!training && (
          <tbody className="text-white font-normal text-base">
            {data ? (
              <>
                <tr>
                  <th className="w-[30%]">Item</th>
                  <th className="w-[6.7%]">Qty</th>
                  <th className="w-[13.3%]">Portion</th>
                  <th className="w-[13.3%]">Calories</th>
                  <th className="w-[13.3%]">Carbs</th>
                  <th className="w-[13.3%]">Protein</th>
                  <th className="w-[13.3%]">Fat</th>
                </tr>

                {trackedFoodObjects !== undefined &&
                  trackedFoodObjects.map((foodObject, index) => {
                    const foodEnergy = foodObject?.nutrients.find(i => i?.slug == "Energy");
                    const foodMacros = foodObject?.nutrients.find(i => i?.slug == "Macronutrients");

                    const foodKcalsPer100g = foodEnergy?.nutrients?.find(value => value?.slug === "energyKcal");

                    const foodCarbsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "carbohydrate");

                    const foodProteinsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "protein");

                    const foodFatsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "fat");

                    const foodKcals = currency(foodKcalsPer100g?.value || "")
                      .multiply(currency((trackedFoodPortions && trackedFoodPortions[index]?.value) || ""))
                      .multiply(currency((trackedFoodQuantities && trackedFoodQuantities[index]) || ""))
                      .divide(100);

                    const foodCarbs = currency(foodCarbsPer100g?.value || "")
                      .multiply(currency((trackedFoodPortions && trackedFoodPortions[index]?.value) || ""))
                      .multiply(currency((trackedFoodQuantities && trackedFoodQuantities[index]) || ""))
                      .divide(100);
                    const foodProteins = currency(foodProteinsPer100g?.value || "")
                      .multiply(currency((trackedFoodPortions && trackedFoodPortions[index]?.value) || ""))
                      .multiply(currency((trackedFoodQuantities && trackedFoodQuantities[index]) || ""))
                      .divide(100);
                    const foodFats = currency(foodFatsPer100g?.value || "")
                      .multiply(currency((trackedFoodPortions && trackedFoodPortions[index]?.value) || ""))
                      .multiply(currency((trackedFoodQuantities && trackedFoodQuantities[index]) || ""))
                      .divide(100);

                    return (
                      <tr key={index}>
                        <td>{foodObject?.name}</td>
                        <td>{`${trackedFoodQuantities && trackedFoodQuantities[index]}`}</td>
                        <td>{trackedFoodPortions && trackedFoodPortions[index]?.name}</td>
                        <td>{`${Math.round(foodKcals?.value ? foodKcals.value : 0)} ${foodKcalsPer100g?.unit}`}</td>
                        <td>{`${Math.round(foodCarbs?.value ? foodCarbs.value : 0)} ${foodCarbsPer100g?.unit}`}</td>
                        <td>{`${Math.round(foodProteins?.value ? foodProteins.value : 0)} ${foodProteinsPer100g?.unit}`}</td>
                        <td>{`${Math.round(foodFats?.value ? foodFats.value : 0)} ${foodFatsPer100g?.unit}`}</td>
                      </tr>
                    );
                  })}
              </>
            ) : (
              <tr>
                <td className="w-[30%]"></td>
                <td className="w-[6.7%]"></td>
                <td className="w-[13.3%]"></td>
                <td className="w-[13.3%]"></td>
                <td className="w-[13.3%]"></td>
                <td className="w-[13.3%]"></td>
                <td className="w-[13.3%]"></td>
              </tr>
            )}
            <tr>
              <td className="w-[30%]"></td>
              <td className="w-[6.7%]"></td>
              <td className={`w-[13.3%] ${trackedBgCarbsCodeColour} rounded-ss-md border-t border-l ${trackedBorderCarbsCodeColour}`}>
                Total
              </td>
              <td className={`w-[13.3%] ${trackedBgCarbsCodeColour} border-t  ${trackedBorderCarbsCodeColour}`}>
                {`${Math.round(caloriesTracked)} kcal` || "0 kcal"}
              </td>
              <td className={`w-[13.3%] ${trackedBgCarbsCodeColour} border-t  ${trackedBorderCarbsCodeColour}`}>
                {`${Math.round(carbsTracked)} g` || "0 g"}
              </td>
              <td className={`w-[13.3%] ${trackedBgCarbsCodeColour} border-t  ${trackedBorderCarbsCodeColour}`}>
                {`${Math.round(proteinTracked)} g` || "0 g"}
              </td>
              <td className={`w-[13.3%] ${trackedBgCarbsCodeColour} border-t  ${trackedBorderCarbsCodeColour}`}>
                {`${Math.round(fatTracked)} g` || "0 g"}
              </td>
            </tr>
          </tbody>
        )}

        {training && (
          <tbody className="text-white font-normal text-base">
            {data ? (
              <>
                <p className="flex p-2 pl-4 space-x-2">{skipped ? "Skipped" : (trackedFoodObjects?.length || 0) > 0 ? "Tracked" : ""}</p>

                <tr>
                  <th className="w-[30%]">Item</th>
                  <th className="w-[6.7%]">Qty</th>
                  <th className="w-[13.3%]">Portion</th>
                  <th className="w-[13.3%]">Calories</th>
                  <th className="w-[13.3%]">Carbs</th>
                  <th className="w-[13.3%]">Protein</th>
                  <th className="w-[13.3%]">Fat</th>
                </tr>

                {trackedFoodObjects !== undefined &&
                  trackedFoodObjects.map((foodObject, index) => {
                    const foodEnergy = foodObject?.nutrients.find(i => i?.slug == "Energy");
                    const foodMacros = foodObject?.nutrients.find(i => i?.slug == "Macronutrients");

                    const foodKcalsPer100g = foodEnergy?.nutrients?.find(value => value?.slug === "energyKcal");

                    const foodCarbsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "carbohydrate");

                    const foodProteinsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "protein");

                    const foodFatsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "fat");

                    const foodKcals = currency(foodKcalsPer100g?.value || "")
                      .multiply(currency((trackedFoodPortions && trackedFoodPortions[index]?.value) || ""))
                      .multiply(currency((trackedFoodQuantities && trackedFoodQuantities[index]) || ""))
                      .divide(100);

                    const foodCarbs = currency(foodCarbsPer100g?.value || "")
                      .multiply(currency((trackedFoodPortions && trackedFoodPortions[index]?.value) || ""))
                      .multiply(currency((trackedFoodQuantities && trackedFoodQuantities[index]) || ""))
                      .divide(100);
                    const foodProteins = currency(foodProteinsPer100g?.value || "")
                      .multiply(currency((trackedFoodPortions && trackedFoodPortions[index]?.value) || ""))
                      .multiply(currency((trackedFoodQuantities && trackedFoodQuantities[index]) || ""))
                      .divide(100);
                    const foodFats = currency(foodFatsPer100g?.value || "")
                      .multiply(currency((trackedFoodPortions && trackedFoodPortions[index]?.value) || ""))
                      .multiply(currency((trackedFoodQuantities && trackedFoodQuantities[index]) || ""))
                      .divide(100);

                    return (
                      <tr key={index}>
                        <td>{foodObject?.name}</td>
                        <td>{`${trackedFoodQuantities && trackedFoodQuantities[index]}`}</td>
                        <td>{trackedFoodPortions && trackedFoodPortions[index]?.name}</td>
                        <td>{`${Math.round(foodKcals?.value ? foodKcals.value : 0)} ${foodKcalsPer100g?.unit}`}</td>
                        <td>{`${Math.round(foodCarbs?.value ? foodCarbs.value : 0)} ${foodCarbsPer100g?.unit}`}</td>
                        <td>{`${Math.round(foodProteins?.value ? foodProteins.value : 0)} ${foodProteinsPer100g?.unit}`}</td>
                        <td>{`${Math.round(foodFats?.value ? foodFats.value : 0)} ${foodFatsPer100g?.unit}`}</td>
                      </tr>
                    );
                  })}
              </>
            ) : (
              <tr>
                <td className="w-[30%]"></td>
                <td className="w-[6.7%]"></td>
                <td className="w-[13.3%]"></td>
                <td className="w-[13.3%]"></td>
                <td className="w-[13.3%]"></td>
                <td className="w-[13.3%]"></td>
                <td className="w-[13.3%]"></td>
              </tr>
            )}

            <tr>
              <td className="w-[30%]"></td>
              <td className="w-[6.7%]"></td>
              <td className={`w-[13.3%] ${trackedBgCarbsCodeColour} rounded-ss-md border-t border-l ${trackedBorderCarbsCodeColour}`}>
                Total
              </td>
              <td className={`w-[13.3%] ${trackedBgCarbsCodeColour} border-t  ${trackedBorderCarbsCodeColour}`}>
                {`${Math.round(caloriesTracked)} kcal` || "0 kcal"}
              </td>
              <td className={`w-[13.3%] ${trackedBgCarbsCodeColour} border-t  ${trackedBorderCarbsCodeColour}`}>
                {`${Math.round(carbsTracked)} g` || "0 g"}
              </td>
              <td className={`w-[13.3%] ${trackedBgCarbsCodeColour} border-t  ${trackedBorderCarbsCodeColour}`}>
                {`${Math.round(proteinTracked)} g` || "0 g"}
              </td>
              <td className={`w-[13.3%] ${trackedBgCarbsCodeColour} border-t  ${trackedBorderCarbsCodeColour}`}>
                {`${Math.round(fatTracked)} g` || "0 g"}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}
