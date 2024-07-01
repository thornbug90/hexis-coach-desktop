import React, { useEffect, useRef, useState } from "react";
import { ICarbCodeSection } from "@components/carbCodesContainer";
import { CARB_CODE } from "hexis/constants/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteMeal, getFoodLog, updateMeal } from "hexis/lib/graphql-client";
import { FoodLogQuery, Meal_Type, MutationDeleteMealArgs, MutationUpdateMealArgs } from "hexis/generated/graphql";
import currency from "currency.js";
import clsx from "clsx";
import AlertIcon from "hexis/components/icons/general/AlertIcon";
import TimePicker from "../../client-profile/components/time-picker";
import { PencilIcon } from "hexis/components/icons/general";
import TrashIcon2 from "hexis/components/icons/general/TrashIcon2";
import { refetchClentWeek } from "hexis/components/common/date-component";
import { isBetweenInclusive } from "hexis/utils/common";

const CarbCodeSection = ({
  dayId,
  mealId,
  mealType,
  name,
  time,
  energy,
  carb,
  protein,
  fat,
  carbsCode,
  tracked,
  trackedTime,
  skip = false,
  skippedTime,
  mealVerification,
  snackMedMin,
  snackMedMax,
  snackLowMax,
  snackLowMin,
  mainMedMin,
  mainMedMax,
  mainLowMax,
  mainLowMin,
}: ICarbCodeSection) => {
  const [_, setTrackedData] = useState<FoodLogQuery | undefined>(undefined);
  const [fatTracked, setFatTracked] = useState(0);
  const [caloriesTracked, setCaloriesTracked] = useState(0);
  const [proteinTracked, setProteinTracked] = useState(0);
  const [carbsTracked, setCarbsTracked] = useState(0);
  const [carbsCodeColor, setCarbsCodeColor] = useState("");
  const [mealName, setMealName] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [showMealMenu, setShowMealMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useQuery({
    queryKey: ["getFoodLog", mealVerification?.id],
    queryFn: () => getFoodLog({ verificationId: mealVerification?.id || "" }),
    enabled: !!mealVerification,
  });

  const { mutateAsync: updateMealMutation } = useMutation({
    mutationKey: ["update-meal"],
    mutationFn: (args: MutationUpdateMealArgs) => updateMeal({ updateMealId: args.id, input: args.input }),
  });

  const { mutateAsync: deleteMealMutation } = useMutation({
    mutationKey: ["delete-meal"],
    mutationFn: (args: MutationDeleteMealArgs) => deleteMeal({ deleteMealId: args.id }),
  });

  const menuRef = useRef<HTMLDivElement>(null);
  const mealRef = useRef<HTMLDivElement>(null);
  const mealNameRef = useRef(mealName);
  const mealTimeRef = useRef(mealTime);
  const onRightClickShowMealMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMealMenu(true);
  };

  const handleEditMeal = () => {
    setShowMealMenu(false);
    setIsEdit(true);
  };

  const handleDeleteMeal = () => {
    deleteMealMutation({ id: mealId });
    refetchClentWeek();
    setShowMealMenu(false);
  };

  const cancelSave = () => {
    setIsEdit(false);
    setMealName(mealNameRef.current);
    setMealTime(mealTimeRef.current);
  };

  const confirmSave = () => {
    const input = {
      mealName,
      dayId,
      mealType: mealType as Meal_Type,
      time: `${mealTime}:00.000Z`,
    };
    updateMealMutation({ id: mealId, input });
    refetchClentWeek();
    setIsEdit(false);
  };
  const useOutMenuSideAlerter = (ref: React.RefObject<any>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setShowMealMenu(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const useOutMealSideAlerter = (ref: React.RefObject<any>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsEdit(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutMenuSideAlerter(menuRef);
  useOutMealSideAlerter(mealRef);

  useEffect(() => {
    setMealName(name ?? "");
    setMealTime(time ?? "");
    mealNameRef.current = name ?? "";
    mealTimeRef.current = time ?? "";
  }, [name, time]);
  useEffect(() => {
    if (data) {
      setTrackedData(data);
      let kcals = 0;
      let carbs = 0;
      let protein = 0;
      let fats = 0;

      const foodObjects = data?.foodLog?.foodObjects;
      const portions = data?.foodLog?.portions;
      const quantities = data?.foodLog?.quantities;

      foodObjects?.forEach((foodObject, index) => {
        const foodEnergy = foodObject?.nutrients.find(i => i?.slug === "Energy");
        const foodMacros = foodObject?.nutrients.find(i => i?.slug === "Macronutrients");

        const foodKcalsPer100g = foodEnergy?.nutrients?.find(value => value?.slug === "energyKcal");

        const foodCarbsPer100g = foodMacros?.nutrients?.find(value => value?.slug === "carbohydrate");

        const foodProteinsPer100g = foodMacros?.nutrients?.find(value => value?.slug === "protein");

        const foodFatsPer100g = foodMacros?.nutrients?.find(value => value?.slug === "fat");

        const foodKcals = currency(foodKcalsPer100g?.value || "")
          .multiply(currency(portions[index]?.value || ""))
          .multiply(currency(quantities[index] || ""))
          .divide(100);

        const foodCarbs = currency(foodCarbsPer100g?.value || "")
          .multiply(currency(portions[index]?.value || ""))
          .multiply(currency(quantities[index] || ""))
          .divide(100);
        const foodProteins = currency(foodProteinsPer100g?.value || "")
          .multiply(currency(portions[index]?.value || ""))
          .multiply(currency(quantities[index] || ""))
          .divide(100);
        const foodFats = currency(foodFatsPer100g?.value || "")
          .multiply(currency(portions[index]?.value || ""))
          .multiply(currency(quantities[index] || ""))
          .divide(100);

        kcals += foodKcals.value;
        carbs += foodCarbs.value;
        protein += foodProteins.value;
        fats += foodFats.value;
      });

      setCarbsTracked(carbs);
      setProteinTracked(protein);
      setCaloriesTracked(kcals);
      setFatTracked(fats);

      let lowMin, lowMax, medMin, medMax;

      if (mealType === Meal_Type.Snack) {
        lowMin = snackLowMin;
        lowMax = snackLowMax;
        medMin = snackMedMin;
        medMax = snackMedMax;
      } else {
        lowMin = mainLowMin;
        lowMax = mainLowMax;
        medMin = mainMedMin;
        medMax = mainMedMax;
      }

      if (isBetweenInclusive(lowMin, lowMax, carbs)) {
        setCarbsCodeColor("LOW");
      } else if (isBetweenInclusive(medMin, medMax, carbs)) {
        setCarbsCodeColor("MEDIUM");
      } else {
        setCarbsCodeColor("HIGH");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const SkippedComponent = () => (
    <div
      className="h-[15px] flex items-center justify-between w-full bg-background-300 rounded-b-lg text-xxs font-normal border border-background-300 tracking-[0.25px]"
      style={{
        boxShadow: "0px 1px 3px 0px rgba(16, 24, 40, 0.20), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
      }}
    >
      <p
        className={clsx("font-semibold", {
          "opacity-20": isEdit,
        })}
      >
        Skipped
      </p>
      <p
        className={clsx({
          "opacity-20": isEdit,
        })}
      >
        {skippedTime}
      </p>
    </div>
  );

  const isWarningAlert = () => {
    if (energy && caloriesTracked) {
      if (energy * 1.15 < caloriesTracked || energy * 0.85 > caloriesTracked) {
        if (Math.abs(energy - caloriesTracked) > 50) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  return (
    <div
      className={clsx(
        "w-full h-full cursor-pointer hover:drop-shadow-4xl rounded-lg my-3 flex flex-col justify-between items-center text-lightgrey1-600 font-medium tracking-[0.25px]",
        {
          "bg-gradient-to-r from-carbcodelow-100 to-carbcodelow-500": carbsCode === CARB_CODE.LOW,
          "bg-gradient-to-r from-carbcodemedium-100 to-carbcodemedium-500": carbsCode === CARB_CODE.MEDIUM,
          "bg-gradient-to-r from-carbcodehigh-100 to-carbcodehigh-500": carbsCode === CARB_CODE.HIGH,
        },
      )}
      ref={mealRef}
      onContextMenu={onRightClickShowMealMenu}
    >
      <div className="w-full rounded-lg flex flex-col gap-1 p-2">
        <div className="flex items-center justify-between gap-1">
          <input
            className="text-sm tracking-[0.25px] font-normal flex-1 text-ellipsis text-left"
            value={mealName}
            onChange={e => {
              setMealName(e.target.value);
            }}
            disabled={!isEdit}
          />
          <TimePicker
            value={mealTime}
            setValue={value => {
              setMealTime(value);
            }}
            isDisabled={!isEdit}
            type="time"
          />
        </div>
        <div
          className={clsx("text-xxs font-semibold tracking-[0.25px]", {
            "opacity-20": isEdit,
          })}
        >
          {energy || 0} Kcal
        </div>
        <div
          className={clsx("flex relative justify-between items-center font-light tracking-[0.25px] text-xxs", {
            "opacity-20": isEdit,
          })}
        >
          <div
            className={clsx(
              "absolute flex flex-col cursor-pointer -right-3 top-0 gap-x-2 items-center justify-betwee rounded-md bg-lightgrey2-700 z-50",
              {
                hidden: !showMealMenu,
                flex: showMealMenu,
              },
            )}
            ref={menuRef}
          >
            <div className="flex items-center w-full gap-2 pt-2 pb-1.5 px-3 hover:bg-[#312F42]" onClick={handleEditMeal}>
              <PencilIcon height={12} width={12} />
              <span className="text-xs font-normal text-white/80 tracking-[0.5px] leading-4 whitespace-nowrap">{"Edit"}</span>
            </div>
            <div className="flex items-center w-full gap-2 pb-2 pt-1.5 px-3 hover:bg-[#312F42]" onClick={handleDeleteMeal}>
              <TrashIcon2 height={12} width={12} />
              <span className="text-xs font-normal text-white/80 tracking-[0.5px] leading-4 whitespace-nowrap">{"Delete"}</span>
            </div>
          </div>
          <p className="flex space-x-1">{carb ? Math.round(carb) : 0}g C</p>
          <span className="font-normal">{"\u2022"}</span>
          <p className="flex space-x-1">{protein ? Math.round(protein) : 0}g P</p>
          <span className="font-normal">{"\u2022"}</span>
          <p className="flex space-x-1">{fat ? Math.round(fat) : 0}g F</p>
        </div>
      </div>

      {tracked && skip && <SkippedComponent />}

      {tracked && !skip && (
        <>
          <div
            className={clsx("flex flex-col justify-end w-full rounded-b-lg", {
              "bg-gradient-to-r from-carbcodelow-100 to-carbcodelow-500": carbsCodeColor === CARB_CODE.LOW,
              "bg-gradient-to-r from-carbcodemedium-100 to-carbcodemedium-500": carbsCodeColor === CARB_CODE.MEDIUM,
              "bg-gradient-to-r from-carbcodehigh-100 to-carbcodehigh-500": carbsCodeColor === CARB_CODE.HIGH,
              "opacity-20": isEdit,
            })}
          >
            <div className="flex flex-col gap-1 w-full bg-background-300 p-2 text-[10px]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  {isWarningAlert() && (
                    <p>
                      <AlertIcon />
                    </p>
                  )}
                  <p className="font-semibold">{Math.round(caloriesTracked)} Kcal</p>
                </div>
                <p>{trackedTime}</p>
              </div>

              <div className="flex justify-between items-center font-light tracking-[0.25px]">
                <p className="flex space-x-1">{`${Math.round(carbsTracked)}g`} C</p>
                <span className="font-normal">{"\u2022"}</span>
                <p className="flex space-x-1">{`${Math.round(proteinTracked)}g`} P</p>
                <span className="font-normal">{"\u2022"}</span>
                <p className="flex space-x-1">{`${Math.round(fatTracked)}g`} F</p>
              </div>
            </div>

            <div
              className={clsx("h-1 rounded-b-lg", {
                "bg-gradient-to-r from-carbcodelow-100 to-carbcodelow-500": carbsCodeColor === CARB_CODE.LOW,
                "bg-gradient-to-r from-carbcodemedium-100 to-carbcodemedium-500": carbsCodeColor === CARB_CODE.MEDIUM,
                "bg-gradient-to-r from-carbcodehigh-100 to-carbcodehigh-500": carbsCodeColor === CARB_CODE.HIGH,
              })}
            ></div>
          </div>
        </>
      )}
      {isEdit && (
        <div className="flex gap-2 self-stretch p-2">
          <div
            className="flex px-3 py-2 justify-center items-center gap-2.5 flex-1 rounded-lg border-[1px] border-white h-8 cursor-pointer"
            onClick={cancelSave}
          >
            <span className="text-white text-center font-normal tracking-[0.5px] capitalize text-xs">Cancel</span>
          </div>
          <div
            className="flex px-3 py-2 justify-center items-center gap-2.5 flex-1 rounded-lg border-[1px] border-activeblue-100 bg-activeblue-100 h-8 cursor-pointer"
            onClick={confirmSave}
          >
            <span className="text-white text-center font-normal tracking-[0.5px] capitalize text-xs">Save</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarbCodeSection;
