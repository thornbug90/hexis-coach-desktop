"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/navigation";
import moment from "moment";
import { getDayByDateRange } from "hexis/lib/graphql-client";
import { setClientEndDate, setClientStartDate, setSelectedClientDay, setUserLoading } from "hexis/state/user/slice";
import { useAppSelector } from "hexis/hooks/useRedux";
import { ChevronLeft, ChevronRight } from "../icons/general";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "./button";

interface Props {
  dateRange?: { startDate: string; endDate: string };
}

export let refetchClentWeek: Function = () => {};

export const DateComponent = ({ dateRange }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [startDate, setStartDate] = useState(!isEmpty(dateRange) ? moment(dateRange?.startDate) : moment().startOf("isoWeek"));
  const [endDate, setEndDate] = useState(!isEmpty(dateRange) ? moment(dateRange?.endDate) : moment().endOf("isoWeek"));
  const [showDayPicker, setShowDayPicker] = useState(false);

  const { selectedClient } = useAppSelector(({ user: { selectedClient }, carbCoding: { fuelPlanView } }) => ({
    selectedClient,
    fuelPlanView,
  }));
  const { data, error, refetch, isRefetching, isLoading } = useQuery({
    queryKey: ["getDaysByDateRange", startDate, endDate, selectedClient?.id],
    queryFn: () =>
      getDayByDateRange({
        startDate: moment(startDate)?.format("YYYY-MM-DDT12:mm:ssZ"),
        endDate: moment(endDate)?.format("YYYY-MM-DDT12:mm:ssZ"),
        daysId: selectedClient?.id || "",
      }),
    enabled: !!selectedClient,
  });
  refetchClentWeek = refetch;

  useEffect(() => {
    if (data) {
      dispatch(setSelectedClientDay(data?.days));
    }

    if (error) {
      console.log("Errors while fetching fuel plan");
      console.log(error);
      dispatch(setSelectedClientDay([]));
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    if (isLoading || isRefetching) dispatch(setUserLoading(true));
    if (!isLoading && !isRefetching) dispatch(setUserLoading(false));
  }, [isLoading, isRefetching, dispatch]);

  useEffect(() => {
    dispatch(setClientStartDate(startDate?.format()));
    dispatch(setClientEndDate(endDate?.format()));
  }, [dispatch, startDate, endDate]);

  function prevWeek() {
    const newStartDate = startDate?.subtract(1, "week");
    const newEndDate = endDate?.subtract(1, "week");

    const params = new URLSearchParams({
      startDate: newStartDate?.format("YYYY-MM-DD") || "",
      endDate: newEndDate?.format("YYYY-MM-DD") || "",
    }).toString();

    router.push(`client-fuel-plan?${params}`);

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setRange({ from: newStartDate.toDate(), to: newEndDate.toDate() });
  }

  function nextWeek() {
    const newStartDate = startDate?.add(1, "week");
    const newEndDate = endDate?.add(1, "week");

    const params = new URLSearchParams({
      startDate: newStartDate?.format("YYYY-MM-DD") || "",
      endDate: newEndDate?.format("YYYY-MM-DD") || "",
    }).toString();

    router.push(`client-fuel-plan?${params}`);

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setRange({ from: newStartDate.toDate(), to: newEndDate.toDate() });
  }

  moment.updateLocale("en", {
    week: {
      dow: 1,
    },
  });

  const [range, setRange] = useState<DateRange | undefined>({ from: startDate.toDate(), to: endDate.toDate() });

  const handleDateChange = ({ startDate, endDate }: { startDate: moment.Moment; endDate: moment.Moment }) => {
    const params = new URLSearchParams({
      startDate: startDate?.format("YYYY-MM-DD") || "",
      endDate: endDate?.format("YYYY-MM-DD") || "",
    }).toString();
    router.push(`client-fuel-plan?${params}`);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <>
      <div className="flex items-center gap-3 bg-background-300 py-2 px-4 rounded-lg h-14 font-normal tracking-wide text-xs">
        <button onClick={prevWeek}>
          <span className="text-activeblue-100">
            <ChevronLeft width={10} height={18} color="currentColor" />
          </span>
        </button>
        <p
          className="cursor-pointer text-base font-medium whitespace-nowrap"
          onClick={() => setShowDayPicker(!showDayPicker)}
        >{`${moment(range?.from).format("MMM DD")} - ${moment(range?.to).format("MMM DD")}`}</p>
        <button onClick={nextWeek}>
          <span className="text-activeblue-100">
            <ChevronRight width={10} height={18} color="currentColor" />
          </span>
        </button>
      </div>
      {showDayPicker && (
        <div className="flex flex-col absolute bg-background-300 rounded-lg z-50">
          <div className=" flex-row">
            <DayPicker
              defaultMonth={range?.from}
              mode="range"
              min={7}
              max={7}
              selected={range}
              onSelect={setRange}
              weekStartsOn={1}
              showOutsideDays={true}
              disabled={[{ before: new Date(selectedClient?.onboardingComplete) }]}
            />
          </div>
          <div className="flex self-end mr-3 mb-3">
            <Button
              text=" Go > "
              onClick={() => {
                handleDateChange({ startDate: moment(range?.from), endDate: moment(range?.to) });
                setShowDayPicker(!showDayPicker);
              }}
              className="m-1"
            />
          </div>
        </div>
      )}
    </>
  );
};
