import { sortArrayByTime } from "hexis/utils/common";
import MealItem from "hexis/components/common/meal-item";
import MealSettingTools from "./MealSettingTools";
import React, { useCallback, useState } from "react";
import { Day_Names, MealTemplate } from "hexis/generated/graphql";

type Props = {
  dayName: Day_Names;
  index: number;
  mealPlan: MealTemplate[];
  setMealPlan: React.Dispatch<React.SetStateAction<MealTemplate[]>>;
};
const MealPlanPerDayComponent: React.FC<Props> = ({ dayName, index, mealPlan, setMealPlan }) => {
  const [isHover, setIsHover] = useState(false);
  const handleMouseOver = useCallback(() => setIsHover(true), []);
  const handleMouseLeave = useCallback(() => setIsHover(false), []);
  const dayNameTitle = Object.keys(Day_Names).find(key => Day_Names[key as keyof typeof Day_Names] === dayName);
  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={`flex-col flex-1 border-r-[0.5px] border-lightgrey1-600 border-opacity-20 min-h-[50vh] ${index === 0 ? "border-l-[0.5px] rounded-tl-xl" : index === 6 ? "rounded-tr-xl" : ""}`}
    >
      <div
        className={`py-2 px-3 flex items-center  bg-background-300 text-lightgrey1-700 text-sm tracking-[0.25px] font-normal ${index === 0 ? "rounded-tl-xl" : index === 6 ? "rounded-tr-xl" : ""}`}
      >
        {dayNameTitle}
      </div>
      <div className="flex pt-4 px-3 flex-col gap-3 items-start flex-1 self-stretch">
        {mealPlan?.length > 0 &&
          sortArrayByTime(mealPlan.filter(meal => meal.dayName === dayName)).map((meal: MealTemplate, index: number) => (
            <MealItem key={index} meal={meal} setMealPlan={setMealPlan} />
          ))}
        <div className={`${isHover ? "block" : "hidden"} w-full`}>
          <MealSettingTools dayName={dayName} mealPlan={mealPlan} setMealPlan={setMealPlan} />
        </div>
      </div>
    </div>
  );
};

export default MealPlanPerDayComponent;
