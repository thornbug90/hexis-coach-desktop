import { Total_Activity_Duration } from "hexis/generated/graphql";

export enum MEAL_SLOT {
  BREAKFAST = "BREAKFAST",
  AM_SNACK = "AM_SNACK",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  PRE_BED_SNACK = "PRE_BED_SNACK",
  PM_SNACK = "PM_SNACK",
}

export enum Sex {
  Female = "FEMALE",
  Male = "MALE",
}

export enum Weight_Unit {
  Kg = "KG",
  Lbs = "LBS",
}

export enum Workout_Unit {
  GRAMS = "g",
  GRAMS_PER_HOURS = "g/hr",
}

export const weightUnit = {
  [Weight_Unit.Kg]: "kg",
  [Weight_Unit.Lbs]: "lbs",
};

export enum Height_Unit {
  Ft = "FT",
  M = "M",
  CM = "CM",
  in = "in",
}

export const heightUnit = {
  [Height_Unit.in]: "in",
  [Height_Unit.Ft]: "ft",
  [Height_Unit.M]: "m",
  [Height_Unit.CM]: "cm",
};

export const activityDurations = {
  [Total_Activity_Duration.ZeroToThreeHours]: "0-3 Hours",
  [Total_Activity_Duration.ThreeToSixHours]: "3-6 Hours",
  [Total_Activity_Duration.SixToNineHours]: "6-9 Hours",
  [Total_Activity_Duration.NineToTwelveHours]: "9-12 Hours",
  [Total_Activity_Duration.TwelvePlusHours]: "12+ Hours",
};

export const mealSlots = {
  [MEAL_SLOT.BREAKFAST]: "Breakfast",
  [MEAL_SLOT.AM_SNACK]: "AM Snack",
  [MEAL_SLOT.LUNCH]: "Lunch",
  [MEAL_SLOT.PM_SNACK]: "PM Snack",
  [MEAL_SLOT.DINNER]: "Dinner",
  [MEAL_SLOT.PRE_BED_SNACK]: "Pre Bed Snack",
};

export enum Goal {
  Gain = "GAIN",
  Lose = "LOSE",
  Maintain = "MAINTAIN",
}

export const goal = {
  [Goal.Gain]: "Gain",
  [Goal.Lose]: "Lose",
  [Goal.Maintain]: "Maintain",
};

export enum SPORT {
  RUGBY = "Rugby",
  CYCLING = "Cycling",
}

export enum CARB_CODE {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum WORKOUT_INTENSITY {
  LIGHT = "LIGHT",
  MODERATE = "MODERATE",
  HARD = "HARD",
  UNSPECIFIED = "UNSPECIFIED",
}

export const workoutIntesity = {
  [WORKOUT_INTENSITY.LIGHT]: "Light",
  [WORKOUT_INTENSITY.MODERATE]: "Moderate",
  [WORKOUT_INTENSITY.HARD]: "Hard",
  [WORKOUT_INTENSITY.UNSPECIFIED]: "Unspecified",
};

export enum WORKOUT_SLOT {
  BEFORE_BREAKFAST = "BEFORE_BREAKFAST",
  BEFORE_AM_SNACK = "BEFORE_AM_SNACK",
  BEFORE_LUNCH = "BEFORE_LUNCH",
  BEFORE_PM_SNACK = "BEFORE_PM_SNACK",
  BEFORE_DINNER = "BEFORE_DINNER",
  BEFORE_PRE_BED_SNACK = "BEFORE_PRE_BED_SNACK",
  UNSPECIFIED = "UNSPECIFIED",
}

export enum WORKOUT_SOURCE {
  USER = "USER",
  POINT = "POINT",
  COACH = "COACH",
  TRAINING_PEAKS = "TRAINING_PEAKS",
}

export enum WORKOUT_STATUS {
  ACTIVE = "ACTIVE",
  CONFLICTED = "CONFLICTED",
  WAITING = "WAITING",
  INCOMPLETE = "INCOMPLETE",
  DISCARDED = "DISCARDED",
}

export enum ENTITLEMENTS_ID {
  COACH = "coach-access-desktop",
  ATHLETE = "individual-access-desktop",
}

export const LIFESTYLE_ACTIVITY = {
  SEDENTARY: "Sedentary",
  LIGHTLY_ACTIVE: "Lightly Active",
  ACTIVE: "Active",
  PRO_ATHLETE: "Pro Athlete",
};

export const SEX = {
  MALE: "Male",
  FEMALE: "Female",
};

export enum Days {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

export enum MealType {
  MAIN = "Main",
  SNACK = "Snack",
  INTRA_FUELLING = "Intra Fuelling",
}

export enum MealName {
  BREAKFAST = "Breakfast",
  LUNCH = "Lunch",
  DINNER = "Dinner",
  SNACK = "Snack",
}
