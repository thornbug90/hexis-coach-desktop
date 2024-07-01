import CookieIcon from "hexis/components/icons/general/CookieIcon";
import CopyIcon from "hexis/components/icons/general/CopyIcon";
import DarkBowlFoodIcon from "hexis/components/icons/general/DarkBowlFood";
import PaintBrushBroadIcon from "hexis/components/icons/general/PaintBrushBroad";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Day_Names, MealTemplate, Meal_Sub_Type, Meal_Type } from "hexis/generated/graphql";

type Props = {
  dayName: Day_Names;
  mealPlan: MealTemplate[];
  setMealPlan: React.Dispatch<React.SetStateAction<MealTemplate[]>>;
};
type IconProps = {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isHover: boolean;
  isDisabled: boolean;
  clickAction: () => void;
};
const MealSettingTools: React.FC<Props> = ({ dayName, mealPlan, setMealPlan }) => {
  const addMeal = useCallback(
    (mealType: Meal_Type) => {
      setMealPlan(prev => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          dayName,
          mealType,
          mealName: "",
          time: "00:00",
          mealplanId: "",
          mealSubType: Meal_Sub_Type.Unspecified,
        },
      ]);
    },
    [dayName, setMealPlan],
  );
  const defaultIconList: IconProps[] = useMemo(
    () => [
      {
        title: "Add Main",
        icon: DarkBowlFoodIcon,
        isHover: false,
        isDisabled: false,
        clickAction: () => addMeal(Meal_Type.Main),
      },
      {
        title: "Add Snack",
        icon: CookieIcon,
        isHover: false,
        isDisabled: false,
        clickAction: () => addMeal(Meal_Type.Snack),
      },
      {
        title: "Copy Day",
        icon: CopyIcon,
        isHover: false,
        isDisabled: false,
        clickAction: () => {},
      },
      {
        title: "Paste",
        icon: PaintBrushBroadIcon,
        isHover: false,
        isDisabled: true,
        clickAction: () => {},
      },
    ],
    [addMeal],
  );

  const [iconList, setIconList] = useState(defaultIconList);

  const confirmActiveTitle = useCallback((index: number) => {
    const newIconList = iconList.map((item, i) => {
      if (i === index) {
        return { ...item, isHover: true };
      }
      return { ...item, isHover: false };
    });

    setIconList(newIconList);
  }, []);

  useEffect(() => {
    if (mealPlan?.length > 0 && mealPlan.filter(meal => meal.dayName === dayName).length === 0) {
      setIconList(
        defaultIconList.map((item, index) => ({
          ...item,
          isDisabled: index === 2 || index === 3 ? true : false,
        })),
      );
    }
  }, [mealPlan?.length]);
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center flex-1 w-full gap-2.5 mb-2">
        {iconList.map((item, index) => {
          const { isDisabled, clickAction, icon: Icon } = item;
          return (
            <div
              onMouseOver={() => confirmActiveTitle(index)}
              onMouseLeave={() => confirmActiveTitle(-1)}
              onClick={() => typeof clickAction === "function" && clickAction()}
              key={index}
              className={`flex items-center justify-center rounded-lg p-2 border flex-1 border-activeblue-100 bg-background-500 hover:bg-activeblue-100 ${!!isDisabled ? "opacity-40 hover:bg-background-500" : ""}`}
            >
              <Icon width={20} height={20} color="#fff" />
            </div>
          );
        })}
      </div>
      <span className="flex justify-center text-xxs font-medium text-white/80 tracking-[0.5px]">
        {iconList.find(item => item.isHover)?.title || ""}
      </span>
    </div>
  );
};

export default MealSettingTools;
