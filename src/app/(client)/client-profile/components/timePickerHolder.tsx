import { Meal_Name } from "hexis/generated/graphql";
import { mealSlots } from "../../../../constants/user";
export interface ITimeTableContent {
  title: Meal_Name;
  time?: string;
  disabled: boolean;
}

export default function TimeTableContent({ title, time, disabled = false }: ITimeTableContent) {
  const style = disabled ? "bg-background-400 text-slate-400" : "border-sky-400 border-[2.34px] bg-background-30 text-white";
  return (
    <div className={`rounded-md w-full h-[53.40px] m-4 mx-auto ${style}`}>
      <div className="flex h-full justify-between items-center p-3 px-6">
        <h3 className="text-base font-medium">{mealSlots[title as "BREAKFAST"]}</h3>
        <h3 className="text-base font-medium">{time}</h3>
      </div>
    </div>
  );
}
