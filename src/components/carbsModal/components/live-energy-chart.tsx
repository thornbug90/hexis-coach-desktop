"use client";

import Image from "next/image";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import { liveGraphClientByDate } from "hexis/lib/graphql-client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Meal_Type, Workout_Status } from "hexis/generated/graphql";
import { useAppSelector } from "hexis/hooks/useRedux";
import { parseTime, getLiteralTime } from "hexis/utils/dates";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter, VictoryZoomContainer } from "victory";
import { isBefore, isAfter, isSameMinute, subMinutes, endOfDay, format } from "date-fns";
import Loading from "hexis/components/common/loading";
import TargetIcon from "../../../../public/icons/general/TargetIcon.svg";
import activities from "hexis/constants/activities";
import NoData from "./no-live-graph-data";
import useInterval from "hexis/hooks/useInterval";

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);
dayjs.extend(timezone);

const LabelComponent = ({ biggest, activityId, midpoint, scale }: any) => {
  const Icon = activities[activityId as keyof typeof activities].icon;

  return (
    <svg y={scale.y(biggest + 400)} x={scale.x(midpoint) - 10}>
      <Icon color="#359BEE" height={35} width={35} />
    </svg>
  );
};

const TheoreticalEndComponent = () => <Image src={TargetIcon} width={30} height={30} alt="Target-icon" color="white" />;

export default function LiveEnergyChart({ width }: { width: number; height: number }) {
  // rerenders the graph when trialData changes
  const { currentSelectedDay, selectedClient } = useAppSelector(({ user: { currentSelectedDay, selectedClient } }) => ({
    currentSelectedDay,
    selectedClient,
  }));

  const clientId = selectedClient?.id || "";

  const currentSelectedDate =
    // @ts-ignore
    currentSelectedDay?.date || dayjs().format("YYYY-MM-DD");
  // @ts-ignore
  const currentSelectedFormattedDate = new Date(currentSelectedDate);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["getLiveGraph"],
    queryFn: () =>
      liveGraphClientByDate({
        date: currentSelectedFormattedDate,
        id: clientId,
      }),
  });

  const [biggestSurplus, setBiggestSurplus] = useState<{ data: number }>({
    data: 0,
  });

  const [biggestDeficit, setBiggestDeficit] = useState<{ data: number }>({
    data: 0,
  });

  const [kcalDomain, setKcalDomain] = useState([-1000, 1000]);

  const [tickValues, setTickValues] = useState<Date[]>([]);
  const [workouts, setWorkouts] = useState<any[]>([]);

  const selectedClientCurrentHours = dayjs.tz(dayjs(), selectedClient?.timezone || "").hour();
  const selectedClientCurrentMinutes = dayjs.tz(dayjs(), selectedClient?.timezone || "").minute();
  const selectedClientCurrentDate = dayjs.tz(dayjs(), selectedClient?.timezone || "").date();
  const selectedClientCurrentMonth = dayjs.tz(dayjs(), selectedClient?.timezone || "").month();
  const selectedClientCurrentYear = dayjs.tz(dayjs(), selectedClient?.timezone || "").year();
  const [selectedClientCurrentTime, setSelectedClientCurrentTime] = useState(
    dayjs()
      .date(selectedClientCurrentDate)
      .month(selectedClientCurrentMonth)
      .year(selectedClientCurrentYear)
      .hour(selectedClientCurrentHours)
      .minute(selectedClientCurrentMinutes)
      .toDate(),
  );

  const isCurrentDay =
    dayjs(currentSelectedFormattedDate).utc().isToday() || dayjs(currentSelectedFormattedDate).isSame(selectedClientCurrentTime, "date");

  // refetch if date changes
  useEffect(() => {
    refetch();
  }, [currentSelectedDate]);

  // Update current time every 30 seconds to make it real-time
  useInterval(
    function timer() {
      const selectedClientCurrentHours = dayjs.tz(dayjs(), selectedClient?.timezone || "").hour();
      const selectedClientCurrentMinutes = dayjs.tz(dayjs(), selectedClient?.timezone || "").minute();
      const selectedClientCurrentDate = dayjs.tz(dayjs(), selectedClient?.timezone || "").date();
      const selectedClientCurrentMonth = dayjs.tz(dayjs(), selectedClient?.timezone || "").month();
      const selectedClientCurrentYear = dayjs.tz(dayjs(), selectedClient?.timezone || "").year();

      setSelectedClientCurrentTime(
        dayjs()
          .date(selectedClientCurrentDate)
          .month(selectedClientCurrentMonth)
          .year(selectedClientCurrentYear)
          .hour(selectedClientCurrentHours)
          .minute(selectedClientCurrentMinutes)
          .toDate(),
      );
    },
    30 * 1000,
    currentSelectedFormattedDate,
  );

  const liveGraph = data?.liveGraphClient?.graph;

  useEffect(() => {
    if (liveGraph) {
      const biggestSurplusValue = liveGraph.reduce(
        // @ts-ignore
        (el, max) => (el?.data > max?.data ? { data: el.data } : max),
        { data: 0 },
      );

      const biggestDeficitValue = liveGraph.reduce(
        // @ts-ignore
        (el, max) => (el?.data < max?.data ? { data: el.data } : max),
        { data: 0 },
      );

      setBiggestSurplus({ data: biggestSurplusValue!.data });
      setBiggestDeficit({ data: biggestDeficitValue!.data });

      const biggest = Math.max(Math.abs(biggestDeficitValue!.data), Math.abs(biggestSurplusValue!.data));

      setKcalDomain([biggest * -1 - 500, biggest + 500]);
    }
  }, [liveGraph]);

  const biggest = Math.max(Math.abs(biggestDeficit.data), Math.abs(biggestSurplus.data));

  useEffect(() => {
    const start = dayjs(currentSelectedDate).startOf("day").toDate();
    const ticks = [];

    for (let i = start; dayjs(i).isSame(start, "date"); i = dayjs(i).add(60, "minutes").toDate()) {
      ticks.push(i);
    }

    setTickValues(ticks);
  }, [currentSelectedDate]);

  useEffect(() => {
    if (currentSelectedDay && liveGraph) {
      const workoutLines: any[] = [];

      currentSelectedDay?.workouts
        .filter(workout => workout?.status === Workout_Status.Active)
        .map(workout => {
          const points = liveGraph.filter(i => {
            const time = dayjs(currentSelectedDate).utc(true).hour(i?.time?.split(":")[0]).minute(i?.time?.split(":")[1]).format();
            const start = dayjs(workout?.start).toDate();
            const end = dayjs(workout?.end).toDate();

            return dayjs(time).isSameOrAfter(start, "m") && dayjs(time).isSameOrBefore(end, "m");
          });

          workoutLines.push({
            workout,
            data: points,
          });
        });

      setWorkouts(workoutLines);
    }
  }, [currentSelectedDay?.workouts, liveGraph]);

  // We hide the graph if it's in the future. You can only
  // See the graph today and previous dates
  const isFutureDay = dayjs(currentSelectedFormattedDate).isAfter(selectedClientCurrentTime, "date");
  if (isFutureDay) return <NoData liveGraph />;

  if (isFetching) return <Loading />;

  const isFuture = dayjs(currentSelectedFormattedDate).isAfter(selectedClientCurrentTime, "date");
  const isPast = dayjs(currentSelectedFormattedDate).isBefore(selectedClientCurrentTime, "date");

  // This is the solid line for the past (any date before "today" [present day])
  const pastLine = isPast && (
    <VictoryLine
      interpolation="natural"
      data={liveGraph ?? []}
      // @ts-ignore
      x={d => dayjs(currentSelectedDate).hour(d?.time?.split(":")[0]).minute(d?.time?.split(":")[1]).toDate()}
      y="data"
      style={{
        data: {
          stroke: "white",
          strokeWidth: 3,
        },
      }}
    />
  );

  // This is the solid line for the past of the present day
  const currentDayPastLine = isCurrentDay && (
    <VictoryLine
      interpolation="natural"
      data={
        liveGraph
          ? isCurrentDay
            ? liveGraph.filter(i => isBefore(parseTime(i?.time, currentSelectedFormattedDate), selectedClientCurrentTime))
            : liveGraph
          : []
      }
      // @ts-ignore
      x={d => parseTime(d.time, currentSelectedFormattedDate)}
      y="data"
      style={{
        data: {
          stroke: "white",
          strokeWidth: 2,
        },
      }}
    />
  );

  // This is the solid line for the future (a date after present date)
  const futureLine = isFuture && (
    <VictoryLine
      interpolation="natural"
      data={liveGraph ?? []}
      // @ts-ignore
      x={d => dayjs(currentSelectedFormattedDate).hour(d?.time?.split(":")[0]).minute(d?.time?.split(":")[1]).toDate()}
      y="data"
      style={{
        data: {
          stroke: "white",
          strokeWidth: 3,
          strokeDasharray: 10,
        },
      }}
    />
  );

  // This is the dashed line for the future of the present day
  const currentDayFutureLine = isCurrentDay && (
    <VictoryLine
      interpolation="natural"
      data={
        liveGraph
          ? isCurrentDay
            ? liveGraph.filter(i => isAfter(parseTime(i?.time, currentSelectedFormattedDate), selectedClientCurrentTime))
            : liveGraph
          : []
      }
      // @ts-ignore
      x={d => parseTime(d.time, currentSelectedFormattedDate)}
      y="data"
      style={{
        data: {
          stroke: "white",
          opacity: 0.6,
          strokeWidth: 2,
          strokeDasharray: 6,
        },
      }}
    />
  );

  const colors = {
    "carbcodelow-100": "#E63D5B",
    "carbcodemedium-100": "#FE9201",
    "carbcodehigh-100": "#00A398",
  };

  const mealPoints = liveGraph && currentSelectedDay && (
    <VictoryScatter
      size={12}
      style={{
        data: {
          strokeWidth: 2,
          fill: ({ datum }: any) =>
            datum.verifiedCarbCode
              ? colors[`carbcode${datum.verifiedCarbCode.toLowerCase()}-100` as "carbcodelow-100"]
              : ("#18152D" as string),
          stroke: ({ datum }: any) => colors[`carbcode${datum.carbCode.toLowerCase()}-100` as "carbcodelow-100"],
        },
      }}
      data={currentSelectedDay?.meals
        ?.filter(meal => meal?.mealType !== Meal_Type.IntraFuelling)
        .map(meal => ({
          carbCode: meal?.carbCode,
          verifiedCarbCode: meal?.mealVerification?.carbCode,
          x: meal?.mealVerification?.time
            ? parseTime(getLiteralTime(new Date(meal?.mealVerification?.time)), currentSelectedFormattedDate)
            : parseTime(meal?.time, currentSelectedFormattedDate),
          y: liveGraph[
            liveGraph.findIndex(i =>
              isSameMinute(
                parseTime(i!.time, currentSelectedFormattedDate),
                meal?.mealVerification?.time
                  ? parseTime(getLiteralTime(new Date(meal?.mealVerification?.time)), currentSelectedFormattedDate)
                  : parseTime(meal?.time, currentSelectedFormattedDate),
              ),
            )
          ]?.data,
        }))}
    />
  );

  const workoutPoints = workouts?.map((workout, index) => {
    if (!workout) return null;

    const start = parseTime(getLiteralTime(new Date(workout.workout.start)), currentSelectedFormattedDate);
    const end = parseTime(getLiteralTime(new Date(workout.workout.end)), currentSelectedFormattedDate);

    return (
      <VictoryLine
        interpolation="natural"
        key={index}
        data={workout.data}
        // @ts-ignore
        x={d => parseTime(d.time, currentSelectedFormattedDate)}
        y="data"
        labels={[""]}
        labelComponent={
          <LabelComponent
            biggest={biggest}
            activityId={workout.workout.activity.id as keyof typeof activities}
            midpoint={(start.getTime() + end.getTime()) / 2}
          />
        }
        style={{
          data: {
            stroke: "#359BEE",
            strokeWidth: 4,
          },
        }}
      />
    );
  });

  const currentTimePoint = liveGraph && isCurrentDay && (
    <VictoryScatter
      size={8}
      style={{
        data: {
          fill: "#00A398",
        },
      }}
      data={[
        {
          x: selectedClientCurrentTime,
          y: liveGraph[liveGraph?.findIndex(i => i?.time === `${dayjs(selectedClientCurrentTime).format("HH:mm")}:00.000Z`)]?.data,
        },
      ]}
    />
  );

  const endOfDayPoint = data?.liveGraphClient?.predictedEnd && (
    <VictoryScatter
      dataComponent={<TheoreticalEndComponent />}
      data={[
        {
          x: subMinutes(endOfDay(currentSelectedFormattedDate), 20),
          y: data?.liveGraphClient?.predictedEnd,
        },
      ]}
    />
  );

  const handleCurrentTime = () => selectedClientCurrentTime;

  const currentTimeLine = liveGraph && isCurrentDay && (
    <VictoryLine
      interpolation="natural"
      style={{
        data: {
          strokeWidth: 3,
          stroke: "#0C5C63",
        },
      }}
      // @ts-ignore
      x={handleCurrentTime}
    />
  );

  return (
    <div className="flex justify-center items-center flex-col space-y-2">
      {isFetching && <Loading />}
      {!isFetching && (
        <div
          className={`bg-gradient-to-tr from-[#242543] to-[#263154] w-full flex flex-col flex justify-center items-center rounded-t-lg min-w-[${
            width + 100
          }px]`}
        >
          <p className="text-lg font-medium px-8 pt-4 text-left w-full">Live Energy</p>

          <VictoryChart
            domain={{
              y: kcalDomain as any,
              x: [dayjs(currentSelectedDate).startOf("day").toDate(), dayjs(currentSelectedDate).endOf("day").toDate()],
            }}
            width={width + 60}
            // backgroundComponent={<Background y={50} height={300} />}
            height={400}
            style={{
              background: { opacity: 0.5, fill: "#30314C" },
            }}
            containerComponent={<VictoryZoomContainer zoomDimension="x" allowPan={true} allowZoom={false} />}
          >
            {/* Set time values on the X axis and draw the lines */}
            <VictoryAxis
              crossAxis
              offsetY={50}
              style={{
                grid: {
                  stroke: "#18152D",
                  strokeWidth: 1,
                },
                axis: {
                  stroke: "#18152D",
                  strokeWidth: 1,
                },
                tickLabels: { fill: "white", fontSize: 10 },
              }}
              tickFormat={d => format(d, "HH:mm")}
              tickValues={tickValues}
            />

            {/* Set kcal values on the Y axis and draw the lines */}
            <VictoryAxis
              dependentAxis
              tickCount={10}
              label="kcal"
              crossAxis={false}
              style={{
                grid: {
                  stroke: "#18152D",
                  strokeWidth: 1,
                },
                axis: {
                  stroke: "#18152D",
                  strokeWidth: 3,
                  display: "none",
                },
                axisLabel: {
                  fill: "white",
                  fontSize: 12,
                },
                tickLabels: { fill: "white", fontSize: 10 },
              }}
            />

            {/* Set the X axis in the mid of the graph and draw the line */}
            <VictoryAxis
              crossAxis
              style={{
                axis: {
                  stroke: "#7476A6",
                  strokeWidth: 1,
                },
                tickLabels: { display: "none" },
              }}
            />

            {pastLine}
            {currentDayPastLine}

            {futureLine}
            {currentDayFutureLine}

            {/* Draw workouts */}
            {workoutPoints}

            {/* Draw a vertical line for the current time */}
            {currentTimeLine}

            {/* Draw the ending of the day */}
            {endOfDayPoint}

            {/* Draw a dot for the current time */}
            {currentTimePoint}

            {mealPoints}
          </VictoryChart>
        </div>
      )}

      <div className="flex justify-between bg-[#242644] items-center px-6 w-full text-xs">
        <p>Legend</p>
        <div className="flex space-x-6">
          <div className="flex items-center p-4 space-x-2">
            <div className="border-b border-white w-4" />
            <p>Past</p>
          </div>
          <div className="flex items-center p-4 space-x-2">
            <div className="border-b border-white border-dashed	w-4" />
            <p>Predicted</p>
          </div>
          <div className="flex items-center p-4 space-x-2">
            <div className="border-b border-activeblue-100 w-4" />
            <p>Workout</p>
          </div>
          <div className="flex items-center p-4 whitespace-nowrap space-x-2">
            <div className="w-1/4 h-4 flex relative cursor-pointer">
              <span className="absolute right-1 rounded-full bg-background-400 border-2 border-carbcodehigh-100 h-4 w-4" />
              <span className="absolute right-3 rounded-full bg-background-400 border-2 border-carbcodemedium-100 h-4 w-4" />
              <span className="absolute right-5 rounded-full bg-background-400 border-2 border-carbcodelow-100 h-4 w-4" />
            </div>
            <p>Planned Meal</p>
          </div>
          <div className="flex items-center p-4 whitespace-nowrap space-x-2">
            <div className="w-1/4 h-4 flex relative cursor-pointer">
              <span className="absolute z-20  right-1 rounded-full bg-carbcodelow-100 h-4 w-4" />
              <span className="absolute z-10 right-3 rounded-full bg-carbcodemedium-100 h-4 w-4" />
              <span className="absolute right-5 rounded-full  bg-carbcodehigh-100 h-4 w-4" />
            </div>
            <p>Logged Meal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
