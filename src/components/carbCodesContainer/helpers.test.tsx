import { Meal_Nutrition_Status, Workout, Workout_Status } from "hexis/generated/graphql";
import { IMeal } from "hexis/state/user/types";
import { getActiveMeals, getActiveWorkouts } from "./helpers";

describe("getActiveMeals", () => {
  it("should return active meals with time added", () => {
    const meals = [
      { id: "1", status: Meal_Nutrition_Status.Active, time: "2023-10-26T12:00:00.000Z" },
      { id: "2", status: Meal_Nutrition_Status.Deleted, time: "2023-10-26T13:00:00.000Z" },
    ];

    const expected = [{ id: "1", status: Meal_Nutrition_Status.Active, time: "2023-10-26T12:00:00", isMeal: true }];

    expect(getActiveMeals(meals as IMeal[])).toEqual(expected);
  });

  it("should handle empty meals array", () => {
    const meals: IMeal[] = [];
    expect(getActiveMeals(meals)).toEqual([]);
  });
});

describe("getActiveWorkouts", () => {
  it("should return active workouts with time added and isMeal set to false", () => {
    const workouts = [
      { id: "1", status: Workout_Status.Active, start: "2023-10-26T14:00:00.000Z" },
      { id: "2", status: Workout_Status.Incomplete, start: "2023-10-26T15:00:00.000Z" },
    ];

    const expected = [{ id: "1", status: Workout_Status.Active, start: "2023-10-26T14:00:00.000Z", time: "14:00:00", isMeal: false }];
    expect(getActiveWorkouts(workouts as Workout[])).toEqual(expected);
  });

  it("should sort active workouts by start time", () => {
    const workouts = [
      { id: "1", status: Workout_Status.Active, start: "2023-10-26T15:00:00.000Z" },
      { id: "2", status: Workout_Status.Active, start: "2023-10-26T14:00:00.000Z" },
    ];

    const expected = [
      { id: "2", status: Workout_Status.Active, start: "2023-10-26T14:00:00.000Z", time: "14:00:00", isMeal: false },
      { id: "1", status: Workout_Status.Active, start: "2023-10-26T15:00:00.000Z", time: "15:00:00", isMeal: false },
    ];

    expect(getActiveWorkouts(workouts as Workout[])).toEqual(expected);
  });

  it("should handle empty workouts array", () => {
    const workouts: Workout[] = [];
    expect(getActiveWorkouts(workouts)).toEqual([]);
  });
});
