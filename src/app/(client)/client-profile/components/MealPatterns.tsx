import React from "react";
import MealPlanPerDayComponent from "./MealPlanPerDayComponent";
import { Day_Names, MealTemplate } from "hexis/generated/graphql";

type Props = {
  mealPlan: MealTemplate[];
  setMealPlan: React.Dispatch<React.SetStateAction<MealTemplate[]>>;
};

const MealPatterns: React.FC<Props> = ({ mealPlan, setMealPlan }) => {
  const Day_Names = {
    Friday: "FRIDAY",
    Monday: "MONDAY",
    Saturday: "SATURDAY",
    Sunday: "SUNDAY",
    Thursday: "THURSDAY",
    Tuesday: "TUESDAY",
    Wednesday: "WEDNESDAY",
  };

  const orderedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const orderedDay_Names = orderedDays.map(day => Day_Names[day as keyof typeof Day_Names]) as Day_Names[];

  return (
    <div className="flex flex-1 w-full">
      {orderedDay_Names.map((dayName: Day_Names, index: number) => (
        <MealPlanPerDayComponent key={index} dayName={dayName} index={index} mealPlan={mealPlan} setMealPlan={setMealPlan} />
      ))}
    </div>
  );
};

export default MealPatterns;
