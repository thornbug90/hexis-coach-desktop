import { Total_Activity_Duration } from "hexis/generated/graphql";

export const convertCamelCaseToUpperCaseWithSpaces = (str: string) => {
  if (str) {
    let result = str.replace(/([a-z])([A-Z])/g, "$1 $2");
    // Convert the result to uppercase
    result = result?.toUpperCase();
    return result;
  } else {
    return "";
  }
};

export const convertEnumValue = (value: unknown): string => {
  if (typeof value !== "string") {
    return "-";
  }

  return value
    .toLowerCase()
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getNumberTimeFromStringTime = (duration: Total_Activity_Duration): string => {
  if (!duration) {
    return "-";
  }
  switch (duration) {
    case Total_Activity_Duration.NineToTwelveHours:
      return "9 - 12 Hours";
    case Total_Activity_Duration.SixToNineHours:
      return "6 - 9 Hours";
    case Total_Activity_Duration.ThreeToSixHours:
      return "3 - 6 Hours";
    case Total_Activity_Duration.ZeroToThreeHours:
      return "0 - 3 Hours";
    case Total_Activity_Duration.TwelvePlusHours:
      return "12+ Hours";
    default:
      return "-";
  }
};

export const sortArrayByTime: Function = function (array: any[]) {
  return array.sort((a, b) => {
    if (a.time === "00:00") {
      return 1;
    }
    if (b.time === "00:00") {
      return -1;
    }
    return a.time.localeCompare(b.time);
  });
};

export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export const isBetween = (min: number | undefined, max: number | undefined, carb: number) => min! < carb && carb <= max!;
export const isBetweenInclusive = (min: number | undefined, max: number | undefined, carb: number) => min! <= carb && carb <= max!;
