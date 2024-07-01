import React, { useCallback, useLayoutEffect, useState } from "react";
import CookieIcon from "../icons/general/CookieIcon";
import DarkBowlFoodIcon from "../icons/general/DarkBowlFood";
import DotThreeVerticalIcon from "../icons/general/DotThreeVerticalIcon";
import TrashIcon from "../icons/general/TrashIcon";
import TimePicker from "hexis/app/(client)/client-profile/components/time-picker";
import { MealTemplate, Meal_Type } from "hexis/generated/graphql";

type Props = {
  meal: MealTemplate;
  setMealPlan: React.Dispatch<React.SetStateAction<MealTemplate[]>>;
};
const MealItem: React.FC<Props> = ({ meal, setMealPlan }) => {
  const [open, setOpen] = React.useState(false);
  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const [mealName, setMealName] = useState(meal.mealName || "");
  const placeholder = `Add ${Object.keys(Meal_Type).find(key => Meal_Type[key as keyof typeof Meal_Type] === meal.mealType)} Name`;
  const handleDeleteMeal = useCallback(() => {
    setMealPlan(prev => prev.filter(item => item.id !== meal.id));
    closeMenu();
  }, [meal.id, setMealPlan, closeMenu]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMealName(e.target.value);
  };

  useLayoutEffect(() => {
    setMealName(meal.mealName || "");
  }, [meal.mealName]);

  const confirmActiveTitle = () => {
    setMealPlan(prev => prev.map(item => (item.id === meal.id ? { ...item, mealName } : item)));
  };
  return (
    <div
      className={`flex p-2 items-start gap-2 self-stretch rounded-lg border-l-[3px] bg-background-300 ${meal.mealType.toUpperCase() === Meal_Type.Main ? "border-activeblue-100" : "border-blue2-100"}`}
    >
      {meal.mealType === Meal_Type.Snack && <CookieIcon width={25} height={24} color="#fff" />}
      {meal.mealType === Meal_Type.Main && <DarkBowlFoodIcon width={25} height={24} color="#fff" />}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <input
            className="text-xs w-full text-left font-medium tracking-[0.5px] text-white bg-background-300"
            value={mealName}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={confirmActiveTitle}
          />
          <div
            onClick={openMenu}
            onMouseLeave={closeMenu}
            className={`relative flex px-0.5 pt-0.5 gap-2.5 items-center justify-center rounded-t-md ${open ? "bg-lightgrey2-700" : ""}`}
          >
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                e.stopPropagation();
                handleDeleteMeal();
              }}
              className={`${open ? "flex" : "hidden"} absolute cursor-pointer right-0 bottom-0 py-1.5 px-3 gap-2 items-center justify-between bg-lightgrey2-700 rounded-l-md rounded-br-md`}
              style={{ transform: "translateY(100%)" }}
            >
              <TrashIcon width={12} height={12} color="#fff" />
              <span className="text-xs font-normal text-white/80 tracking-tighter">Delete</span>
            </div>
            <DotThreeVerticalIcon width={16} height={16} color="#fff" />
          </div>
        </div>
        <TimePicker
          value={meal.time}
          setValue={value => setMealPlan(prev => prev.map(item => (item.id === meal.id ? { ...item, time: value } : item)))}
          isDisabled={false}
          type={""}
        />
      </div>
    </div>
  );
};

export default MealItem;
