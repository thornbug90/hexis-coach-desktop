"use client";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { DateComponent } from "../common/date-component";
import SvgInfoIcon from "../icons/general/InfoIcon";
import { ClientViewLegend } from "./client-view-legend";
import { useDispatch } from "react-redux";
import { setFuelPlanView, showOrHideMacrosAndEnergy } from "hexis/state/carb-coding/slice";
import { CARB_CODING } from "hexis/constants/carbCoding";
import { useAppSelector } from "hexis/hooks/useRedux";
import { showSidebar } from "hexis/state/global/slice";
import MenuIcon from "../icons/general/MenuIcon";

import PieChartIcon from "../icons/general/PieChartIcon";
import { HeaderSync } from "./header-sync";

const inter = Poppins({
  weight: ["400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

interface Props {
  dateRange?: { startDate: string; endDate: string };
}
export const SectionHeader = ({ dateRange }: Props) => {
  const dispatch = useDispatch();
  const [showLegend, setShowLegend] = useState<boolean>(false);

  const [viewToShow, setViewToShow] = useState(true);

  const { selectedClient } = useAppSelector(({ user: { selectedClient }, carbCoding: { fuelPlanView } }) => ({
    selectedClient,
    fuelPlanView,
  }));

  useEffect(() => {
    dispatch(setFuelPlanView(CARB_CODING.TRACKED_VIEW));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerShowLegend = () => {
    setShowLegend(true);
  };

  const triggerHideElement = () => {
    setShowLegend(false);
  };

  const handleButtonClick = () => {
    setViewToShow(prev => !prev);
  };

  useEffect(() => {
    dispatch(showOrHideMacrosAndEnergy(viewToShow));
  }, [dispatch, viewToShow]);

  return (
    <div className={`flex flex-col md:flex-row md:justify-between bg-background-500 pb-8 z-50 w-100 ${inter.className}`}>
      <div className="w-full md:w-1/2 flex gap-3 md:items-center flex-col md:flex-row md:align-center space-y-3 md:space-y-0">
        <div>
          <DateComponent dateRange={dateRange} />
          <div className="absolute top-6 right-8 z-0 lg:hidden" onClick={() => dispatch(showSidebar())}>
            <MenuIcon />
          </div>
        </div>

        <button
          onClick={handleButtonClick}
          className="flex items-center gap-2 px-3 py-2 h-14 rounded-lg border border-activeblue-100 text-lightgrey1-700 font-medium whitespace-nowrap"
        >
          <span>
            <PieChartIcon />
          </span>
          <span>{viewToShow ? "Hide Energy & Macros" : "Show Energy & Macros"}</span>
        </button>

        <HeaderSync />

        <button className="">
          <SvgInfoIcon onMouseEnter={triggerShowLegend} onMouseLeave={triggerHideElement} />
          <ClientViewLegend show={showLegend} />
        </button>
      </div>

      <div className="flex items-center gap-3 text-lg">
        <span className="font-semibold inline-block w-auto">
          {selectedClient?.firstName} {selectedClient?.lastName}
        </span>

        <p className="flex items-center justify-center w-10 h-10 rounded-full bg-activeblue-100">
          <span className="font-light">
            {selectedClient?.firstName && selectedClient?.firstName[0].toUpperCase()}
            {selectedClient?.lastName && selectedClient?.lastName[0].toUpperCase()}
          </span>
        </p>
      </div>
    </div>
  );
};
