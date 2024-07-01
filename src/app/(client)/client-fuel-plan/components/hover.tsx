import React from "react";

const HoverComponent = ({
  mainHighMin,
  mainMedMax,
  mainMedMin,
  mainLowMax,
  mainLowMin,
  snackHighMin,
  snackMedMax,
  snackMedMin,
  snackLowMax,
  snackLowMin,
  empty = false,
  columnNumber = 1,
}: {
  mainHighMin?: number;
  mainMedMax?: number;
  mainMedMin?: number;
  mainLowMax?: number;
  mainLowMin?: number;
  snackHighMin?: number;
  snackMedMax?: number;
  snackMedMin?: number;
  snackLowMax?: number;
  snackLowMin?: number;
  empty?: boolean;
  columnNumber?: number;
}) => {
  let rightPadding = columnNumber > 4 ? "right-px" : "";
  return (
    <div className={`absolute bg-background-400 border border-slate-500 rounded-md flex flex-col p-4 w-96 h-32 m-2 z-50 ${rightPadding}`}>
      <p className="font-medium text-sm mb-2">Carb Code Ranges</p>
      <div className="flex flex-col justify-center h-full">
        <div className="w-full flex justify-between items-center">
          <div>
            <p className="font-medium text-xs">Meals</p>
          </div>
          <div className="flex items-center w-4/5">
            <div className="w-full flex items-center">
              <span className="rounded-full bg-carbcodelow-100 h-4 w-4 m-2" />
              <p className={`text-xs font-normal whitespace-nowrap ${empty && "ml-2"}`}>
                {empty ? "-g" : `${Math.round(mainLowMin!)} - ${Math.round(mainLowMax!)}g`}
              </p>
            </div>
            <div className="w-full flex items-center">
              <span className="rounded-full bg-carbcodemedium-100 h-4 w-4 m-2" />
              <p className={`text-xs font-normal whitespace-nowrap ${empty && "ml-2"}`}>
                {empty ? "-g" : `${Math.round(mainMedMin!)} - ${Math.round(mainMedMax!)}g`}
              </p>
            </div>
            <div className="w-full flex items-center">
              <span className="rounded-full bg-carbcodehigh-100 h-4 w-4 m-2" />
              <p className={`text-xs font-normal whitespace-nowrap ${empty && "ml-2"}`}>
                {empty ? "-g" : `${Math.round(mainHighMin!)} - `}
              </p>
              {!empty && (
                <>
                  <p className={`text-[18px] leading-[22px] font-normal whitespace-nowrap ${empty && "ml-2"}`}>{"\u221E"}</p>
                  <p className={`text-xs font-normal whitespace-nowrap ${empty && "ml-2"}`}>g</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div>
            <p className="font-medium text-xs">Snacks</p>
          </div>
          <div className="flex items-center w-4/5">
            <div className="w-full flex items-center">
              <span className="rounded-full bg-carbcodelow-100 h-4 w-4 m-2" />
              <p className={`text-xs font-normal whitespace-nowrap ${empty && "ml-2"}`}>
                {empty ? "-g" : `${Math.round(snackLowMin!)} - ${Math.round(snackLowMax!)}g`}
              </p>
            </div>
            <div className="w-full flex items-center">
              <span className="rounded-full bg-carbcodemedium-100 h-4 w-4 m-2" />
              <p className={`text-xs font-normal whitespace-nowrap ${empty && "ml-2"}`}>
                {empty ? "-g" : `${Math.round(snackMedMin!)} - ${Math.round(snackMedMax!)}g`}
              </p>
            </div>
            <div className="w-full flex items-center">
              <span className="rounded-full bg-carbcodehigh-100 h-4 w-4 m-2" />
              <p className={`text-xs font-normal whitespace-nowrap ${empty && "ml-2"}`}>
                {empty ? "-g" : `${Math.round(snackHighMin!)} - `}
              </p>
              {!empty && (
                <>
                  <p className={`text-[18px] leading-[22px] font-normal whitespace-nowrap ${empty && "ml-2"}`}>{"\u221E"}</p>
                  <p className={`text-xs font-normal whitespace-nowrap ${empty && "ml-2"}`}>g</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverComponent;
