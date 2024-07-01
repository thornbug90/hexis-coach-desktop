"use client";
import Image from "next/image";
import HexisLogo from "../../../../../public/icons/general/LogoIcon.svg";
import React, { useState } from "react";
import HoverComponent from "./hover";
import dayjs from "dayjs";
import { useAppSelector } from "hexis/hooks/useRedux";
import { IState } from "hexis/state/state";

type Props = {
  beforeCreation: boolean;
  date: string;
};

const EmptyCarbCode = ({ beforeCreation, date }: Props) => {
  const macrosAndEnergy = useAppSelector((state: IState) => state.carbCoding.macrosAndEnergy);
  const [hover, setHover] = useState<boolean>(false);

  const onHover = () => {
    setHover(true);
  };

  const offHover = () => {
    setHover(false);
  };
  return (
    <div className="w-full text-xs cursor-pointer border-r border-lightgrey1-600 border-opacity-10">
      <div className="relative">
        {/* Header */}
        <div className="bg-background-300 w-full h-[37px] flex justify-between items-center px-3 py-2 border-b border-darkgrey1-300">
          <p className="font-normal text-sm tracking-[0.25px]">{date ? dayjs(date).format("ddd DD") : ""}</p>
          <div className="w-1/4 h-4 flex relative cursor-pointer" onMouseOver={onHover} onMouseLeave={offHover}>
            <span className="absolute right-1 rounded-full bg-background-400 border-2 border-carbcodehigh-100 h-[11.961px] w-[11.961px]" />
            <span className="absolute right-3 rounded-full bg-background-400 border-2 border-carbcodemedium-100 h-[11.961px] w-[11.961px]" />
            <span className="absolute right-5 rounded-full bg-background-400 border-2 border-carbcodelow-100 h-[11.961px] w-[11.961px]" />
          </div>
        </div>
        {hover && <HoverComponent empty={true} />}
      </div>

      {macrosAndEnergy && (
        <div className="py-4 px-3 bg-darkgrey1-600 text-xs font-medium tracking-[0.5px]">
          <div className="w-full">
            <div className="w-full flex justify-between items-center space-x-1">
              <p className="">Calories</p>
              <p className="text-[10px]">{"-"} kcal</p>
            </div>

            <progress className="progress progress-accent h-1 bg-lightgrey1-600 bg-opacity-30" value={0} max={100}></progress>
          </div>

          <div className="w-full">
            <div className="w-full flex justify-between items-center space-x-1">
              <p className="">Carbs</p>
              <p className="text-[10px]">{"-"} g</p>
            </div>

            <progress className="progress progress-primary h-1 bg-lightgrey1-600 bg-opacity-30" value={0} max={100}></progress>
          </div>

          <div className="w-full">
            <div className="w-full flex justify-between items-center space-x-1">
              <p className="">Protein</p>
              <p className="text-[10px]">{"-"} g</p>
            </div>

            <progress className="progress progress-primary h-1 bg-lightgrey1-600 bg-opacity-30" value={0} max={0}></progress>
          </div>

          <div className="w-full">
            <div className="w-full flex justify-between items-center space-x-1">
              <p className="">Fat</p>
              <p className="text-[10px]">{"-"} g</p>
            </div>

            <progress className="progress progress-primary h-1 bg-lightgrey1-600 bg-opacity-30" value={0} max={0}></progress>
          </div>
        </div>
      )}

      <div className="flex h-3/5 justify-center items-center flex-col gap-2 space-y-2 p-2 tracking-[0.25px] mt-2">
        <Image src={HexisLogo} className="h-8 w-8" alt="Carb Code Unavailable" />
        <p className="font-semibold text-sm text-center">Carb Codes Unavailable</p>
        {beforeCreation ? (
          <p className="font-normal text-xs text-center">No Carb Codes are calculated for a user prior to their on-boarding date.</p>
        ) : (
          <p className="font-normal text-xs text-center">
            Hexis plans Carb Codes up to 7 days in advance. Please check back closer to the date to view Carb Codes.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmptyCarbCode;
