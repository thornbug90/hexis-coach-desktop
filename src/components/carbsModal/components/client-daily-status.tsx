"use client";
import { useEffect, useState } from "react";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import ChevronRight from "../../icons/general/ChevronRight";
import ChevronLeft from "../../icons/general/ChevronLeft";
import GoalGain from "../../icons/general/GoalGainIcon";
import GoalMaintain from "../../icons/general/GoalMaintainIcon";
import GoalLose from "../../icons/general/GoalLoseIcon";
import currency from "currency.js";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setCurrentSelectedDay } from "hexis/state/user/slice";
import { useAppSelector } from "hexis/hooks/useRedux";
import { weightUnitConverter } from "hexis/utils/weightUnitConverter";
import { useQuery } from "@tanstack/react-query";
import { getDayByDateRange } from "hexis/lib/graphql-client";
import moment from "moment";

dayjs.extend(isSameOrBefore);

export interface IClientDailyStatusProps {
  date: string;
}

export default function ClientDailyStatus({ date }: IClientDailyStatusProps) {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(dayjs(date).format());

  const { selectedClientDay, currentSelectedDay, selectedClient } = useAppSelector(
    ({ user: { selectedClientDay, currentSelectedDay, selectedClient } }) => ({
      selectedClientDay,
      currentSelectedDay,
      selectedClient,
    }),
  );

  const { data, error } = useQuery({
    queryKey: ["getDaysByDateRange", currentDate, selectedClient?.id],
    queryFn: () =>
      getDayByDateRange({
        startDate: moment(currentDate)?.format("YYYY-MM-DDT12:mm:ssZ"),
        endDate: moment(currentDate)?.format("YYYY-MM-DDT12:mm:ssZ"),
        daysId: selectedClient?.id || "",
      }),
    enabled: !!selectedClient,
    cacheTime: 1,
    notifyOnChangeProps: "all",
  });

  useEffect(() => {
    if (data) {
      dispatch(setCurrentSelectedDay(data?.days?.[0]));
    }

    if (error) {
      console.log("Errors while fetching fuel plan");
      console.log(error);
    }
  }, [currentDate, data, error, dispatch]);

  const incrementDayIndex = () => {
    setCurrentDate(prevDate => {
      const newDate = dayjs(prevDate).add(1, "day").format();
      const currentDay = selectedClientDay?.filter(day => day?.date === dayjs(newDate).format("YYYY-MM-DD"))?.[0];
      dispatch(setCurrentSelectedDay(currentDay));
      return newDate;
    });
  };

  const decrementDayIndex = () => {
    setCurrentDate(prevDate => {
      const newDate = dayjs(prevDate).subtract(1, "day").format();
      const currentDay = selectedClientDay?.filter(day => day?.date === dayjs(newDate).format("YYYY-MM-DD"))?.[0];
      dispatch(setCurrentSelectedDay(currentDay));
      return newDate;
    });
  };
  const auditGoal = selectedClient?.userAudit?.filter(user => user?.goal);
  const auditWight = selectedClient?.userAudit?.filter(user => user?.weight);
  let latestGoalIdx = 0;
  let latestWightIdx = 0;
  auditGoal?.map((record, idx) => {
    const closeDate = dayjs(record?.date);
    const targetDateObj = dayjs(currentDate);

    if (targetDateObj?.isSameOrAfter(closeDate)) {
      latestGoalIdx = idx;
    }
  });
  auditWight?.map((record, idx) => {
    const closeDate = dayjs(record?.date);
    const targetDateObj = dayjs(currentDate);

    if (targetDateObj?.isSameOrAfter(closeDate)) {
      latestWightIdx = idx;
    }
  });
  const dateWeight = auditWight?.[latestWightIdx];
  const dateGoal = auditGoal?.[latestGoalIdx];

  return (
    <div className="flex flex-col items-start w-full p-6 pb-4">
      <div className="w-full flex ml-12 space-x-3 pb-2">
        <button onClick={decrementDayIndex}>
          <ChevronLeft color={"#359CEF"} width={26.7} height={24.45} />
        </button>
        <p className="text-xl">{dayjs(currentDate).format("ddd, MMM D")}</p>
        <button onClick={incrementDayIndex}>
          <ChevronRight color={"#359CEF"} width={26.7} height={24.45} />
        </button>
      </div>
      <div className="flex w-full items-center justify-evenly">
        <div className="w-1/2">
          <div className="my-4">
            <div className="flex w-full justify-between">
              <p className="text-xs">Carbohydrates</p>
              <p className="text-xs font-normal">
                {currentSelectedDay?.macros?.carbsCurrent ? Math.round(currentSelectedDay?.macros?.carbsCurrent) : 0} /{" "}
                <span className="text-base font-medium">
                  {Math.round(currentSelectedDay?.macros?.carb ? currentSelectedDay?.macros?.carb : 0)}g
                </span>
              </p>
            </div>
            <progress
              className="progress progress-primary bg-[#30314C] w-full"
              // @ts-ignore
              value={currentSelectedDay?.macros?.carbsCurrent ? Number(currentSelectedDay?.macros?.carbsCurrent) : 0}
              max={currentSelectedDay?.macros?.carb}
            ></progress>
          </div>
          <div className="my-4">
            <div className="flex w-full justify-between">
              <p className="text-xs">Protein</p>
              <p className="text-xs font-normal">
                {currentSelectedDay?.macros?.proteinCurrent ? Math.round(currentSelectedDay?.macros?.proteinCurrent) : 0} /{" "}
                <span className="text-base font-medium">
                  {Math.round(currentSelectedDay?.macros?.protein ? currentSelectedDay?.macros?.protein : 0)} g
                </span>
              </p>
            </div>
            <progress
              className="progress progress-primary w-full bg-[#30314C]"
              // @ts-ignore
              value={currentSelectedDay?.macros?.proteinCurrent ? Number(currentSelectedDay?.macros?.proteinCurrent) : 0}
              max={currentSelectedDay?.macros?.protein}
            ></progress>
          </div>
          <div className="my-4">
            <div className="flex w-full justify-between">
              <p className="text-xs">Fats</p>
              <p className="text-xs font-normal">
                {currentSelectedDay?.macros?.fatCurrent ? Math.round(currentSelectedDay?.macros?.fatCurrent) : 0} /{" "}
                <span className="text-base font-medium">
                  {Math.round(currentSelectedDay?.macros?.fat ? currentSelectedDay?.macros?.fat : 0)} g
                </span>
              </p>
            </div>
            <progress
              className="progress progress-primary bg-[#30314C] w-full"
              // @ts-ignore
              value={currentSelectedDay?.macros?.fatCurrent ? Number(currentSelectedDay?.macros?.fatCurrent) : 0}
              max={currentSelectedDay?.macros?.fat}
            ></progress>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div
            className="radial-progress text-primary/40"
            style={{
              // @ts-ignore
              "--value": currency(currentSelectedDay?.macros?.carbsCurrent || "")
                .divide(currentSelectedDay?.macros?.carb || "")
                .multiply(100)
                .toString(),
              "--size": "12rem",
              "--thickness": "1rem",
            }}
          >
            <div className="text-white flex flex-col items-center justify-center h-48 w-48 rounded-full bg-gradient-radial from-activeblue-100/30 via-background-500 to-background-5000">
              <div className="border-b border-slate-500 p-1">
                <p>{Math.round(currentSelectedDay?.macros?.energyCurrent ? currentSelectedDay?.macros?.energyCurrent : 0)}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl font-light">
                  {Math.round(currentSelectedDay?.macros?.energy ? currentSelectedDay.macros?.energy : 0)}
                </p>
                <p className="text-sm">Kcals</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="text-slate-500">Weight</p>
              <p className="text-2xl">
                {dateWeight?.weight && selectedClient?.weightUnit
                  ? weightUnitConverter(selectedClient?.weightUnit, dateWeight?.weight)
                  : `0 ${selectedClient?.weightUnit}`}
              </p>
            </div>
            <div className="pt-2">
              <p className="text-slate-500">Goal</p>
              <div className="flex space-x-2">
                {dateGoal?.goal === "GAIN" && <GoalGain width={22} height={22} />}
                {dateGoal?.goal === "MAINTAIN" && <GoalMaintain width={22} height={22} />}
                {dateGoal?.goal === "LOSE" && <GoalLose width={22} height={22} />}

                <p className="text-l">{dateGoal?.goal ? dateGoal.goal : "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
