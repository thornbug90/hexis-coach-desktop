import React, { useMemo } from "react";
import { INutritionProps } from "../page";
import InputItem, { IInputItemProps } from "hexis/components/common/input-item";
import { convertCamelCaseToUpperCaseWithSpaces } from "hexis/utils/common";
import ArrowCounterClockwiseIcon from "hexis/components/icons/general/ArrowCounterClockwiseIcon";
import clsx from "clsx";
type Props = {
  nutrition: INutritionProps;
  setNutrition: React.Dispatch<React.SetStateAction<INutritionProps>>;
};
type SideProps = {
  title: string;
  inputList: IInputItemProps[];
  state?: boolean;
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
};
const PersonalisedNutrition: React.FC<Props> = ({ nutrition }) => {
  const [isMainCarbG, setIsMainCarbG] = React.useState<boolean>(true);
  const [isSnackCarbG, setIsSnackCarbG] = React.useState<boolean>(true);
  const weight = nutrition?.weight || 1;
  const leftTopSide: IInputItemProps[] = useMemo(
    () => [
      { title: "energyCalculationFormula", value: nutrition?.formula, width: 80, itemCountOnSameLine: true },
      { title: "rmr", value: nutrition?.rmr + " kcal", width: 20 },
      { title: "dietaryInducedThermogenesis", value: nutrition?.thermogenesis + " %" },
      { title: "proteinConstant", value: nutrition?.proteinConstant + " g/kg" },
    ],
    [nutrition],
  );

  const leftBottomSide: IInputItemProps[] = useMemo(
    () => [
      { title: "activityLevel", value: nutrition?.activityLevel, width: 80, itemCountOnSameLine: true },
      { title: "pal", value: nutrition?.pal.toString(), width: 20 },
      { title: "wakeUpTime", value: nutrition?.wakeUpTime },
      { title: "bedTime", value: nutrition?.bedTime },
    ],
    [nutrition],
  );

  const rightTopSide: IInputItemProps[] = useMemo(
    () => [
      {
        titleComponent: <div className="w-8 h-1 rounded-sm mt-2 bg-[#00A499]" />,
        value: "High",
        width: 50,
        itemCountOnSameLine: true,
      },
      {
        title: "from",
        value: isMainCarbG
          ? nutrition?.mainCarbCodeHighFrom.toFixed(0)?.toString() + "g"
          : (nutrition?.mainCarbCodeHighFrom / weight).toFixed(1)?.toString() + "g/kg",
        width: 25,
        itemCountOnSameLine: true,
      },
      {
        title: "to",
        value: isMainCarbG ? "\u221E" + "g" : "\u221E" + "g/kg",
        width: 25,
      },
      {
        titleComponent: <div className="w-8 h-1 rounded-sm mt-2 bg-[#FF9301]" />,
        value: "Medium",
        width: 50,
        itemCountOnSameLine: true,
      },
      {
        title: "from",
        value: isMainCarbG
          ? nutrition?.mainCarbCodeMediumFrom.toFixed(0)?.toString() + "g"
          : (nutrition?.mainCarbCodeMediumFrom / weight).toFixed(1)?.toString() + "g/kg",
        width: 25,
        itemCountOnSameLine: true,
      },
      {
        title: "to",
        value: isMainCarbG
          ? nutrition?.mainCarbCodeMediumTo.toFixed(0)?.toString() + "g"
          : (nutrition?.mainCarbCodeMediumTo / weight).toFixed(1)?.toString() + "g/kg",
        width: 25,
      },
      {
        titleComponent: <div className="w-8 h-1 rounded-sm mt-2 bg-[#E73D5B]" />,
        value: "Low",
        width: 50,
        itemCountOnSameLine: true,
      },
      {
        title: "from",
        value: isMainCarbG ? 0 + "g" : 0 + "g/kg",
        width: 25,
        itemCountOnSameLine: true,
      },
      {
        title: "to",
        value: isMainCarbG
          ? nutrition?.mainCarbCodeLowTo.toFixed(0)?.toString() + "g"
          : (nutrition?.mainCarbCodeLowTo / weight).toFixed(1)?.toString() + "g/kg",
        width: 25,
      },
    ],
    [
      isMainCarbG,
      nutrition?.mainCarbCodeHighFrom,
      nutrition?.mainCarbCodeLowTo,
      nutrition?.mainCarbCodeMediumFrom,
      nutrition?.mainCarbCodeMediumTo,
      weight,
    ],
  );
  const rightBottomSide: IInputItemProps[] = useMemo(
    () => [
      {
        titleComponent: <div className="w-8 h-1 rounded-sm mt-2 bg-[#00A499]" />,
        value: "High",
        width: 50,
        itemCountOnSameLine: true,
      },
      {
        title: "from",
        value: isSnackCarbG
          ? nutrition?.snackCarbCodeHighFrom.toFixed(0)?.toString() + "g"
          : (nutrition?.snackCarbCodeHighFrom / weight).toFixed(1)?.toString() + "g/kg",
        width: 25,
        itemCountOnSameLine: true,
      },
      {
        title: "to",
        value: isSnackCarbG ? "\u221E" + "g" : "\u221E" + "g/kg",
        width: 25,
      },
      {
        titleComponent: <div className="w-8 h-1 rounded-sm mt-2 bg-[#FF9301]" />,
        value: "Medium",
        width: 50,
        itemCountOnSameLine: true,
      },
      {
        title: "from",
        value: isSnackCarbG
          ? nutrition?.snackCarbCodeMediumFrom.toFixed(0)?.toString() + "g"
          : (nutrition?.snackCarbCodeMediumFrom / weight).toFixed(1)?.toString() + "g/kg",
        width: 25,
        itemCountOnSameLine: true,
      },
      {
        title: "to",
        value: isSnackCarbG
          ? nutrition?.snackCarbCodeMediumTo.toFixed(0)?.toString() + "g"
          : (nutrition?.snackCarbCodeMediumTo / weight).toFixed(1)?.toString() + "g/kg",
        width: 25,
      },
      {
        titleComponent: <div className="w-8 h-1 rounded-sm mt-2 bg-[#E73D5B]" />,
        value: "Low",
        width: 50,
        itemCountOnSameLine: true,
      },
      {
        title: "from",
        value: isSnackCarbG ? 0 + "g" : 0 + "g/kg",
        width: 25,
        itemCountOnSameLine: true,
      },
      {
        title: "to",
        value: isSnackCarbG
          ? nutrition?.snackCarbCodeLowTo.toFixed(0)?.toString() + "g"
          : (nutrition?.snackCarbCodeLowTo / weight).toFixed(1)?.toString() + "g/kg",
        width: 25,
      },
    ],
    [
      isSnackCarbG,
      nutrition?.snackCarbCodeHighFrom,
      nutrition?.snackCarbCodeLowTo,
      nutrition?.snackCarbCodeMediumFrom,
      nutrition?.snackCarbCodeMediumTo,
      weight,
    ],
  );
  const wholeSide: SideProps[][] = [
    [
      { title: "Energy Formula", inputList: leftTopSide },
      { title: "LifeStyle Adjustment", inputList: leftBottomSide },
    ],
    [
      { title: "Main Carb Codes", inputList: rightTopSide, state: isMainCarbG, setState: setIsMainCarbG },
      { title: "Snack Carb Codes", inputList: rightBottomSide, state: isSnackCarbG, setState: setIsSnackCarbG },
    ],
  ];

  const RefreshTools: React.FC<{
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
  }> = ({ state, setState }) => {
    const handleStateChange = (newState: boolean) => () => setState(newState);
    return (
      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "flex items-center justify-center rounded-lg p-3 border flex-1 border-activeblue-100 bg-background-500 opacity-30",
            {},
          )}
        >
          <ArrowCounterClockwiseIcon width={20} height={20} color="#fff" />
        </div>
        <div className={`flex`}>
          <div
            onClick={handleStateChange(true)}
            className={clsx("flex justify-center items-center flex-1 border-[1.5px] rounded-l-md border-activeblue-100", {
              "bg-activeblue-100": state,
            })}
          >
            <span className={`text-white text-base font-normal py-2.5 px-6 flex items-center`}>g</span>
          </div>
          <div
            onClick={handleStateChange(false)}
            className={clsx("flex  justify-center items-center flex-1 border-[1.5px] rounded-r-md border-activeblue-100", {
              "bg-activeblue-100": !state,
            })}
          >
            <span className={`text-white text-base font-normal py-2.5 px-6 flex items-center`}>g/kg</span>
          </div>
        </div>
      </div>
    );
  };
  const renderInputItems = (items: IInputItemProps[]) =>
    items?.map((field, index) => (
      <InputItem
        key={index}
        title={convertCamelCaseToUpperCaseWithSpaces(field.title || "")}
        value={field.value || ""}
        width={field.width || 100}
        itemCountOnSameLine={field.itemCountOnSameLine || false}
        titleComponent={field.titleComponent}
      />
    ));

  const wholeSideComponent = () =>
    wholeSide.map((eachSide, index) => (
      <div key={index} className={`flex flex-col gap-10 flex-1 self-stretch`}>
        {eachSide.map((item, idx) => {
          const { title, inputList, state, setState } = item;
          return (
            <div key={idx} className="flex-col flex-1 items-start gap-3 self-stretch relative">
              {index === 1 && (
                <div className="absolute right-0 -top-3">
                  <RefreshTools state={state || false} setState={setState || (() => {})} />
                </div>
              )}
              <span className="h-[42px] flex items-start text-white font-semibold text-[20px]">{title}</span>
              <div className="flex flex-wrap items-start gap-y-3">{renderInputItems(inputList)}</div>
            </div>
          );
        })}
      </div>
    ));

  return (
    <React.Fragment>
      <div className="flex items-start gap-10 self-stretch">{wholeSideComponent()}</div>
    </React.Fragment>
  );
};

export default PersonalisedNutrition;
