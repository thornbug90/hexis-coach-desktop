import React from "react";
import Image from "next/image";
import SvgLowCarbCodeIcon from "../icons/general/LowCarbCodeIcon";
import SvgMediumCarbCodeIcon from "../icons/general/MediumCarbCodeIcon";
import SvgHighCarbCodeIcon from "../icons/general/HighCarbCodeIcon";
import IntraWorkoutSuggested from "../../../public/icons/general/IntraWorkOutSuggested.svg";
import IntraWorkoutAdded from "../../../public/icons/general/IntraWorkOutAdded.svg";
import KCal from "../../../public/icons/general/Kcal.svg";
import WearableConfirmedIcon from "../../../public/icons/general/WearableConfirmed.svg";
import TrophyIcon from "../../../public/icons/general/TrophyIcon.svg";
import KeyPerformanceIcon from "../../../public/icons/general/KeyPerformanceIcon.svg";

interface IProps {
  show: boolean;
}

export const ClientViewLegend = ({ show }: IProps) => {
  const showLegend = show ? "flex" : "none";
  return (
    <div
      style={{
        minHeight: 197,
        minWidth: 560,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0.633083px 1.26617px rgba(0, 0, 0, 0.12)",
        display: showLegend,
        // right: '5%',
      }}
      className="flex md:columns-12 p-4 rounded-lg border border-gray-100 bg-background-400 absolute text-xs z-50"
    >
      <div className="w-1/3 flex pl-3 flex-col justify-between">
        <div className="flex">
          <span>
            <SvgLowCarbCodeIcon height={16} width={16} />
          </span>
          <span className="ml-3">Low</span>
        </div>
        <div className="flex">
          <span>
            <SvgMediumCarbCodeIcon height={16} width={16} />
          </span>
          <span className="ml-3">Medium</span>
        </div>
        <div className="flex">
          <span>
            <SvgHighCarbCodeIcon height={16} width={16} />
          </span>
          <span className="ml-3">High</span>
        </div>
        <div className="flex">
          <Image src={TrophyIcon} alt="Trophy-icon" className="h-5 w-5" />
          <span className="ml-3">Competition</span>
        </div>
        <div className="flex">
          <span>
            <Image src={KeyPerformanceIcon} alt="KeyPerformance-icon" className="h-5 w-5" />
          </span>
          <span className="ml-3">Key performance</span>
        </div>
      </div>
      <div className="w-2/3 flex flex-col justify-between" style={{ paddingLeft: 15 }}>
        <div className="flex">
          <Image src={IntraWorkoutAdded} alt="" className="h-5 w-5" />
          <span className="ml-3">Intra Workout Fueling - Added to plan</span>
        </div>
        <div className="flex">
          <Image src={IntraWorkoutSuggested} alt="" className="h-5 w-5" />

          <span className="ml-3">Intra Workout Fueling - Suggested but not added</span>
        </div>
        <div className="flex">
          <Image src={WearableConfirmedIcon} alt="wearable" className="h-5 w-5" />
          <span className="ml-3">Wearable</span>
        </div>
        <div className="flex">
          <Image src={KCal} className="h-5 w-5" alt="Calories" />
          <span className="ml-3"> Calories</span>
        </div>
        <div className="h-5"></div>
      </div>
    </div>
  );
};
