import { isBefore } from "date-fns";
import { Meal_Nutrition_Status, Workout, Workout_Status } from "hexis/generated/graphql";
import { IMeal } from "hexis/state/user/types";

// This interface adds the time and meal keys which are added on in the helper.
export interface WorkoutWithTimeAndMealFlag extends Workout {
  time: string;
  isMeal: boolean;
}

export const getActiveMeals = (meals: IMeal[]) => {
  const activeMeal = meals.filter(meal => meal.status === Meal_Nutrition_Status.Active && meal.time);
  const timeAddedMeals = activeMeal.map(meal => ({ ...meal, time: meal.time.split(".")[0], isMeal: true }));
  return timeAddedMeals;
};

export const getActiveWorkouts = (workouts: Workout[]): WorkoutWithTimeAndMealFlag[] => {
  const activeWorkouts = workouts.filter(workout => workout.status === Workout_Status.Active);
  const sortedActiveWorkouts = activeWorkouts.sort((a, b) => {
    if (isBefore(new Date(a.start || ""), new Date(b.start || ""))) return -1;
    if (isBefore(new Date(b.start || ""), new Date(a.start || ""))) return 1;
    return 0;
  });

  const timeAddedAndMealFalseWorkouts = sortedActiveWorkouts.map(workout => ({
    ...workout,
    time: workout?.start.split("T")[1].split(".")[0],
    isMeal: false,
  }));

  return timeAddedAndMealFalseWorkouts;
};
