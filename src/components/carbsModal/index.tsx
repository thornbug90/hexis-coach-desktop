"use client";
import { Poppins } from "next/font/google";
import dayjs from "dayjs";
import TrackedNutrients from "./components/tracked-nutrients";
import FuelPlanTable from "./components/fuel-plan-table";
import DayTotalTable from "./components/day-total-table";
import LiveEnergyChart from "./components/live-energy-chart";
import ClientDailyStatus from "./components/client-daily-status";
import {
  CarbRange,
  Carb_Code,
  FoodLog,
  FoodLogQuery,
  IntraFuellingRecommendation,
  Meal,
  Meal_Type,
  Workout,
  Workout_Status,
} from "hexis/generated/graphql";
import { useAppSelector } from "hexis/hooks/useRedux";
import { useQueries } from "@tanstack/react-query";
import { getFoodLog } from "hexis/lib/graphql-client";
import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { getLiteralTime, formatTimeHourMinute } from "hexis/utils/dates";

export interface FetchedFoodLogs {
  [key: string]: FoodLogQuery;
}
interface ICombinedMealsAndWorkouts {
  id: string;
  isMeal: boolean;
  carbRange?: CarbRange;
  name?: string;
  time: string;
  plannedTime: string;
  trackedTime: string;
  mealTargetKcal: number;
  plannedCarbsCode: Carb_Code;
  skipped: boolean | undefined;
  data: FoodLog;
  workout?: Workout;
  intraFuellingRecommendations?: IntraFuellingRecommendation;
}
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function CarbsModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { currentSelectedDay } = useAppSelector(({ user: { selectedClientDay, currentSelectedDay, selectedClient } }) => ({
    selectedClientDay,
    currentSelectedDay,
    selectedClient,
  }));

  const [fetchedMealsState, setFetchedMealsState] = useState<FetchedFoodLogs>({});
  const [combinedMealsAndWorkouts, setCombinedMealsAndWorkouts] = useState<ICombinedMealsAndWorkouts[]>([]);
  const mealSlotsAndVerifications = (currentSelectedDay?.meals || []).reduce((acc, meal) => {
    if (meal?.time && meal?.carbCode && meal?.carbCode !== Carb_Code.Unspecified) {
      return {
        ...acc,
        [meal?.id || ""]: meal?.mealVerification?.id,
      };
    } else {
      return acc;
    }
  }, {});

  const intraSlotsAndVerifications = (currentSelectedDay?.workouts || []).reduce((acc, workout) => {
    if (workout?.status === Workout_Status.Active) {
      return {
        ...acc,
        [workout?.id || ""]: workout?.intraFuellingMeal?.mealVerification?.id,
      };
    } else {
      return acc;
    }
  }, {});

  const mealAndIntraSlotsAndVerifications = {
    ...mealSlotsAndVerifications,
    ...intraSlotsAndVerifications,
  };

  const mealSlotsAndObjects: { [key: string]: Meal } = (currentSelectedDay?.meals || []).reduce((acc, meal) => {
    if (meal?.time && meal?.carbCode && meal?.carbCode !== Carb_Code.Unspecified) {
      return {
        ...acc,
        [meal?.id || ""]: meal,
      };
    } else {
      return acc;
    }
  }, {});
  const intraSlotsAndObjects: { [key: string]: Meal } = (currentSelectedDay?.workouts || []).reduce((acc, workout) => {
    if (workout?.status === Workout_Status.Active) {
      return {
        ...acc,
        [workout?.id || ""]: workout?.intraFuellingMeal,
      };
    } else {
      return acc;
    }
  }, {});
  const idArray: string[] = Object.keys(mealAndIntraSlotsAndVerifications);
  const verifications: string[] = Object.values(mealAndIntraSlotsAndVerifications);
  const logs = useQueries({
    queries: (verifications || [])?.map(verificationId => ({
      queryKey: ["getFoodLog", verificationId],
      queryFn: () =>
        getFoodLog({
          verificationId: verificationId!,
        }),
      enabled: !!verificationId,
    })),
  });
  useEffect(() => {
    if (logs) {
      const fetchedMeals: FetchedFoodLogs = logs.reduce((acc, log, index) => {
        acc[idArray[index]] = log.data!;
        return acc;
      }, {} as FetchedFoodLogs);

      setFetchedMealsState(fetchedMeals);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs.length, currentSelectedDay]);

  const intraFuellingRecommendations = currentSelectedDay?.intraFuellingRecommendations?.reduce(
    (acc, intra) => {
      // if(intra !== null)
      acc[intra?.workoutId || "key"] = intra!;
      return acc;
    },
    {} as { [key: string]: IntraFuellingRecommendation },
  );

  useEffect(() => {
    const tempCombinedMealsAndWorkouts: ICombinedMealsAndWorkouts[] = [];
    Object.entries(fetchedMealsState).forEach(([id, log]) => {
      if (id in combinedMealsAndWorkouts.map(item => item.id)) return;
      const mealType = currentSelectedDay?.meals?.find(meal => meal?.id === id)?.mealType;
      const carbRange =
        mealType === Meal_Type.Snack ? currentSelectedDay?.carbRanges?.snackRange : currentSelectedDay?.carbRanges?.mainRange;
      const meal: ICombinedMealsAndWorkouts = {
        id: id,
        isMeal: true,
        carbRange: carbRange,
        name: mealSlotsAndObjects[id]?.mealName || "",
        time: mealSlotsAndObjects[id]?.time.split(".")[0],
        plannedTime: formatTimeHourMinute(mealSlotsAndObjects[id]?.time),
        trackedTime:
          mealSlotsAndObjects[id]?.mealVerification?.time && dayjs(mealSlotsAndObjects[id]?.mealVerification?.time).utc().format("HH:mm"),
        mealTargetKcal: mealSlotsAndObjects[id]?.energy || 0,
        plannedCarbsCode: mealSlotsAndObjects[id]?.carbCode,
        skipped: mealSlotsAndObjects[id]?.mealVerification?.skipped as boolean | undefined,
        data: log?.foodLog,
      };
      tempCombinedMealsAndWorkouts.push(meal);
    });

    (currentSelectedDay?.workouts as Workout[]).forEach(workout => {
      if (workout && workout?.status !== Workout_Status.Active) return;
      if (workout.id in combinedMealsAndWorkouts.map(item => item.id)) return;

      const intra = intraFuellingRecommendations ? intraFuellingRecommendations[workout?.id] : undefined;

      const id = workout?.id as string;

      const meal = {
        id: id,
        isMeal: false,
        time: workout?.start.split("T")[1].split(".")[0],
        workout: workout,
        trackedTime:
          intraSlotsAndObjects[id]?.mealVerification?.time && dayjs(intraSlotsAndObjects[id]?.mealVerification?.time).utc().format("HH:mm"),
        skipped: intraSlotsAndObjects[id]?.mealVerification?.skipped as boolean | undefined,
        data: fetchedMealsState[id]?.foodLog,
        intraFuellingRecommendations: intra,
      };
      tempCombinedMealsAndWorkouts.push(meal as any);
    });
    setCombinedMealsAndWorkouts(tempCombinedMealsAndWorkouts);
  }, [
    currentSelectedDay?.carbRanges?.mainRange,
    currentSelectedDay?.carbRanges?.snackRange,
    currentSelectedDay?.meals,
    currentSelectedDay?.workouts,
    fetchedMealsState,
    intraFuellingRecommendations,
    intraSlotsAndObjects,
    mealSlotsAndObjects,
  ]);

  if (!visible) return null;

  return (
    <div
      onClick={onClose}
      className="h-full w-full py-12 overflow-y-scroll bg-background-500 bg-opacity-25 backdrop-blur-sm z-[9999] absolute top-0"
    >
      <div
        onClick={event => event.stopPropagation()}
        className={`w-4/5 mx-auto ${poppins.className} overflow-y-auto  bg-background-500 backdrop-blur-sm border border-slate-400 rounded-lg drop-shadow-lg`}
      >
        {/* Graph */}
        <LiveEnergyChart width={1100} height={300} />
        {/* Stats */}
        <ClientDailyStatus date={currentSelectedDay?.date || dayjs().format()} />
        <div className="border-t border-slate-700 mx-6" />

        {/* Fuel Plan */}
        <div className="w-full flex flex-col space-y-8 my-4 p-6 pt-3">
          {combinedMealsAndWorkouts.length > 0 &&
            combinedMealsAndWorkouts
              .sort((a, b) => a.time?.localeCompare(b.time))
              .map(item => {
                if (item.isMeal) {
                  return (
                    <FuelPlanTable
                      key={item.id}
                      mealName={item.name}
                      carbRange={item.carbRange}
                      mealTargetKcal={`${item.mealTargetKcal}`}
                      plannedTime={item.plannedTime}
                      trackedTime={item.trackedTime}
                      plannedCarbsCode={item.plannedCarbsCode}
                      skipped={item.skipped}
                      skippedTime={item.trackedTime}
                      data={item?.data}
                    />
                  );
                } else {
                  const workout = item.workout;
                  return (
                    <FuelPlanTable
                      key={item.id}
                      training={workout?.status === "ACTIVE"}
                      activity={workout?.activity}
                      workoutCalories={workout?.calories || 0}
                      competition={workout?.competition}
                      intensity={workout?.intensity || ""}
                      workoutKeyPerformance={workout?.key}
                      workoutSource={workout?.source || ""}
                      workoutStart={getLiteralTime(new Date(workout?.start))}
                      workoutEnd={getLiteralTime(new Date(workout?.end))}
                      intraFuelling={workout?.intraFuelling || false}
                      intraFuellingPrompt={workout?.intraFuellingPrompt || false}
                      intraFuellingRecommendations={workout ? intraFuellingRecommendations?.[workout.id] : undefined}
                      trackedTime={item.trackedTime}
                      skipped={item.skipped}
                      data={item.data}
                    />
                  );
                }
              })}

          <DayTotalTable data={Object.values(fetchedMealsState)} />
        </div>
        {/* Tracked Nutrients */}
        {!isEmpty(fetchedMealsState) && <TrackedNutrients data={Object.values(fetchedMealsState)} />}
      </div>
    </div>
  );
}
