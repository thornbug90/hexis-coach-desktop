import { CARB_CODE, WORKOUT_SLOT } from "hexis/constants/user";
import {
  Meal_Nutrition_Status,
  Meal_Sub_Type,
  Meal_Type,
  Workout_Intensity,
  Workout_Source,
  Workout_Status,
} from "hexis/generated/graphql";

export interface IMeal {
  id: string;
  carb: number;
  carbCode: CARB_CODE;
  energy: number;
  fat: number;
  mealName: string;
  mealSubType: Meal_Sub_Type;
  mealType: Meal_Type;
  protein: number;
  time: string;
  mealVerification?: IMealVerification | null;
  status: Meal_Nutrition_Status;
}

export interface IMealVerification {
  id: string;
  skipped: boolean;
  carbCode: CARB_CODE;
  time: string;
  energy: number;
  mealNutritionId: string;
}

export interface IDay {
  date?: string;
  workouts: IWorkout[];
  meals: IMeal[];
  macros: IMacros;
  carbRanges: ICarbRanges;
  fuelCoach: string[];
}

export interface IWorkout {
  id: string;
  intensity: Workout_Intensity;
  activity: IActivity;
  start: string;
  end: string;
  slot: WORKOUT_SLOT;
  keyPerformance: boolean;
  competition: boolean;
  recurring: boolean;
  source: Workout_Source;
  status: Workout_Status;
  confirmed: boolean;
  tracked?: boolean;
  skip?: boolean;
  externalReference: string;
  calories: number;

  intraFuelling: boolean;
  intraFuellingPrompt: boolean;
}

interface IActivity {
  id: string;
  name: string;
  slug: string;
}

export interface IMacros {
  carb: number;
  fat: number;
  protein?: number;
  energy: number;
  energyCurrent: number;
  fatCurrent?: number | null;
  proteinCurrent?: number | null;
  carbsCurrent?: number | null;
}

export interface ICarbRanges {
  mainRange: Range;
  snackRange: Range;
}

interface Range {
  lowMin: number;
  lowMax: number;
  medMin: number;
  medMax: number;
  highMin: number;
  hightMax: number;
}
