import { Workout_Source } from "hexis/generated/graphql";

export type IIntergrationIcon = {
  name: string;
  src: string;
  icon: string;
};
export enum Wearable_Source {
  HealthConnect = "Health Connect",
  AppleHealth = "Apple Health",
  TrainingPeaks = "TrainingPeaks",
  Fitbit = "Fitbit",
  Garmin = "Garmin",
  Oura = "Oura",
  Polar = "Polar",
  Whoop = "Whoop",
  Withings = "Withings",
}

export const integrationIcons = [
  {
    name: "TrainingPeaks",
    src: Workout_Source.TrainingPeaks,
    icon: "images/integration/TrainingPeakIcon.jpg",
  },
  {
    name: "Health Connect",
    src: Workout_Source.HealthConnect,
    icon: "images/integration/HealthConnectIcon.png",
  },
  {
    name: "Apple Health",
    src: Workout_Source.AppleHealth,
    icon: "images/integration/AppleHealthIcon.png",
  },
  {
    name: "Garmin",
    src: Workout_Source.Garmin,
    icon: "images/integration/GarminIcon.png",
  },
];
export default integrationIcons;
