"use client";

import React, { FC, useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Select, { ActionMeta, StylesConfig, components, OptionProps, SingleValueProps } from "react-select";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";

import { CalendarIcon, CancelIcon, InfoIcon, KeyPerformanceIcon, TrophyIcon } from "hexis/components/icons/general";
import activities from "hexis/constants/activities";
import { InputField } from "hexis/components/common/input-field";
import TextArea from "hexis/components/common/textarea-field";
import { Button } from "hexis/components/common/button";
import {
  UpdateWorkoutInput,
  MutationAddGroupWorkoutArgs,
  MutationCreateWorkoutArgs,
  MutationUpdateWorkoutArgs,
  Workout,
  Workout_Intensity,
  Workout_Source,
  MutationDeleteWorkoutArgs,
  Workout_Status,
} from "hexis/generated/graphql";
import { createWorkout, addGroupWorkout, updateWorkout, deleteWorkout } from "hexis/lib/graphql-client";
import "./timer.css";
import ErrorText from "hexis/components/common/error";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "../../../../components/common/date-picker-styles.css";
import { Tooltip } from "react-tooltip";
import { useAppSelector } from "hexis/hooks/useRedux";
import DurationPicker from "./duration-picker";
import { Maybe } from "graphql/jsutils/Maybe";
import identifyWorkout from "hexis/utils/identifyWorkout";
import integrationIcons, { IIntergrationIcon } from "hexis/lib/integrations";
import TrashIcon from "hexis/components/icons/general/TrashIcon";
import ReactSlider from "react-slider";
import IntensityScaleModal from "./intensity-scale-modal";
import clsx from "clsx";
import currency from "currency.js";
import { refetchClentWeek } from "hexis/components/common/date-component";
import { IdsNeedPowerAvgs, intensityMapping } from "hexis/lib/intensity";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

dayjs.extend(customParseFormat);
type ErrorMsgs = {
  duration: null | String;
  startTime: null | string;
};
type IInputFocus = {
  title: boolean;
  date: boolean;
  start: boolean;
  duration: boolean;
  calories: boolean;
  powerAverage: boolean;
  description: boolean;
};
interface ITime {
  value: string;
  label: string;
}

interface IAddWorkout {
  title: string;
  startTime: string;
  duration: string;
  calories: number | null;
  powerAverage: number | null;
  intensity?: Workout_Intensity;
  description: string;
  keyPerformance: boolean;
  competition: boolean;
  date: Date | string;
}

const AddWorkoutModal = ({
  setAddWorkoutModal,
  showAddWorkoutModal,
  date,
  activityId,
  athleteId,
  groupId = undefined,
  isFuelPlanPage = true,
  editItem,
  setWorkoutEditItem,
}: {
  setAddWorkoutModal: Function;
  showAddWorkoutModal: boolean;
  date: string;
  activityId: string;
  athleteId?: string;
  buttonText?: string;
  buttonClass?: string;
  groupId?: null | undefined | string;
  isFuelPlanPage?: boolean;
  editItem: Maybe<Workout>;
  setWorkoutEditItem?: Function;
}) => {
  dayjs.extend(customParseFormat);

  const { mutateAsync: addNewWorkout, isLoading } = useMutation({
    mutationKey: ["create-workout"],
    mutationFn: (args: MutationCreateWorkoutArgs) => createWorkout({ input: args.input, userId: args.userId }),
    onSuccess: () => {
      refetchClentWeek();
      initSet();
      setAddWorkoutModal(false);
    },
  });
  const { mutateAsync: updateExistWorkout, isLoading: isLoadingUW } = useMutation({
    mutationKey: ["update-workout"],
    mutationFn: (args: MutationUpdateWorkoutArgs) =>
      updateWorkout({
        id: args.id,
        input: args.input as UpdateWorkoutInput,
        userId: args.userId,
      }),
    onSuccess: () => {
      refetchClentWeek();
      initSet();
      setAddWorkoutModal(false);
    },
  });
  const { mutateAsync: addGroupWorkoutM, isLoading: isLoadingGW } = useMutation({
    mutationKey: ["create-group-workout"],
    mutationFn: (args: MutationAddGroupWorkoutArgs) => addGroupWorkout({ id: args.id, input: args.input }),
    onSuccess: () => {
      refetchClentWeek();
      initSet();
      setAddWorkoutModal(false);
    },
  });
  useMutation({
    mutationKey: ["delete-workout"],
    mutationFn: (args: MutationDeleteWorkoutArgs) => deleteWorkout({ id: args.id }),
    onSuccess: () => {
      refetchClentWeek();
      initSet();
      setAddWorkoutModal(false);
    },
  });
  dayjs.extend(customParseFormat);
  const showOutline: string = "outline outline-1 outline-activeblue-100";
  const showErrorline: string = "outline outline-1 outline-carbcodelow-600";
  const intensityDetail: string =
    "During hard workouts you will be breathing heavily and spend time at >80% of your max HR. During moderate workouts you will be slightly breathless and spend time between 70-80% of your max HR. During light workouts you can typically still talk easily and spend time <70% of your max HR.";
  const workoutDetail: string =
    "Competition refers to competitive events. This also includes games, matches and races. Key performance refers to the most important training events of your week.";
  const { selectedClient } = useAppSelector(({ user: { selectedClientDay, selectedClient } }) => ({
    selectedClientDay,
    selectedClient,
  }));
  const needToShowAVGPower = IdsNeedPowerAvgs.includes(activityId) && !groupId;
  const selectStyles: StylesConfig = {
    //@ts-ignore
    control: styles => ({
      ...styles,
      backgroundColor: "#18162D",
      color: "#FFF",
      borderWidth: 0,
      height: "0px !important",
      marginTop: "-5px",
      display: "flex",
      padding: "0 !important",
      boxShadow: "0 !important",
      ":hover": {
        border: "0 !important",
      },
      cursor: "pointer",
      minHeight: "0px !important",
    }),
    //@ts-ignore
    option: styles => ({
      ...styles,
      backgroundColor: "#18152d",
      color: "#FFF",
      borderWidth: 0,
      height: "50px",
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      margin: "0",
      outlineStyle: "none",
      ":hover": {
        backgroundColor: "#30314C",
      },
      "&:nth-child(2n-1)": {
        backgroundColor: "#242137",
        ":hover": {
          backgroundColor: "#30314C",
        },
      },
      cursor: "pointer",
    }),
    //@ts-ignore
    singleValue: styles => ({
      ...styles,
      backgroundColor: "#18162D",
      color: "#FFF",
      borderWidth: 0,
      height: "25px",
      marginTop: "0px",
      outlineStyle: "none",
      outline: "none",
      display: "flex",
      alignItems: "center",
      paddingVertical: "10px",
      ":hover": {
        outlineStyle: "none",
      },
      cursor: "pointer",
      paddingTop: 0,
    }),
    valueContainer: styles => ({
      ...styles,
      paddingTop: 0,
    }),
    //@ts-ignore
    input: styles => ({
      ...styles,
      color: "#FFF",
      borderWidth: 0,
    }),
    //@ts-ignore
    menu: styles => ({
      ...styles,
      backgroundColor: "#252642",
      position: "absolute",
      top: "20px",
      zIndex: 1000,
    }),
    dropdownIndicator: styles => ({
      ...styles,
      paddingTop: "1px",
      paddingLeft: 0,
      marginLeft: "-2px",
      marginTop: "-10px",
    }),
  };

  const initFocus: IInputFocus = {
    title: false,
    date: false,
    start: false,
    duration: false,
    calories: false,
    powerAverage: false,
    description: false,
  };

  const { isCompletedWorkout, isIncompletedWorkout } = identifyWorkout();
  const isCompleted: boolean = isCompletedWorkout(editItem);
  const isInCompleted: boolean = isIncompletedWorkout(editItem);
  const [, setIntensity] = useState<Workout_Intensity>(Workout_Intensity.Light);
  const [intensityRPE, setIntensityRPE] = useState(0);
  const [errorMsgs, setErrorMsgs] = useState<ErrorMsgs>({
    duration: null,
    startTime: null,
  });
  const [keyChecked, setKeyChecked] = useState(false);
  const [competitionChecked, setCompetitionChecked] = useState(false);

  const [selectedTime, setSelectedTime] = useState<ITime | undefined>(undefined);

  const [duration, setDuration] = useState<string>("00:00:00");
  const [selectedDate] = useState<Date | undefined>(undefined);
  const [inputFocus, setInputFocus] = useState<IInputFocus>(initFocus);
  const [showIntensityInfo, setShowIntensityInfo] = useState(false);

  const sliderIntensityTitle = (() => {
    const intenstiyValueArray = Object.keys(intensityMapping).map(Number).reverse();
    for (const intensityValue of intenstiyValueArray) {
      if (intensityRPE >= intensityValue) {
        return intensityMapping[intensityValue as keyof typeof intensityMapping];
      }
    }
    return undefined; // Explicitly say that nothing is returned if the loop ends without a match.
  })();
  const ranges = [
    { max: 10, position: 0 },
    { max: 20, position: -22 },
    { max: 33, position: -16 },
    { max: 46, position: -34 },
    { max: 60, position: -64 },
    { max: 77, position: -20 },
    { max: 93, position: -52 },
    { max: 100, position: -85 },
  ];
  const intensityTitlePosition = ranges.find(range => intensityRPE < range.max)?.position ?? -64;
  const wearableIcon = integrationIcons.find((item: IIntergrationIcon) => item.src === editItem?.source);

  const { icon: Icon, name = null } = activities?.[activityId as keyof typeof activities] || {};

  const iconWidth = name === "Triathlon" ? 60 : 25;
  const iconHeight = name === "Triathlon" ? 60 : 25;

  const initSet = () => {
    reset({
      title: "",
      date: dayjs(date.replace("Z", "")).format("DD/MM/YYYY"),
      startTime: "",
      duration: "00:00:00",
      calories: null,
      description: "",
      keyPerformance: false,
      competition: false,
    });
    setSelectedTime(undefined);
    setIntensity(Workout_Intensity.Light);
    setIntensityRPE(0);
    setKeyChecked(false);
    setCompetitionChecked(false);
    setDuration("00:00:00");
    if (setWorkoutEditItem) setWorkoutEditItem(null);
    setErrorMsgs({
      duration: null,
      startTime: null,
    });
    setInputFocus(initFocus);
  };

  const handleChange = (value: ITime) => {
    setSelectedTime(value.value == "00:00" ? undefined : value);
  };

  const millisecondsToHMS = (first: string, end: string): string => {
    const firstDate = new Date(first);
    const endDate = new Date(end);
    let betweenTime = (endDate.getTime() - firstDate.getTime()) / 1000;
    const hours = Math.floor(betweenTime / 3600);
    const minutes = Math.floor((betweenTime % 3600) / 60);
    const remainingSeconds = Math.floor(betweenTime) % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const dateToHHMM = (inputDate: string): string => {
    const date = new Date(inputDate);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => i)
    .flatMap(i => [0, 15, 30, 45].map(j => `${i.toString().padStart(2, "0")}:${j.toString().padStart(2, "0")}`))
    .map(time => ({ value: time, label: time }));

  const changeIntensity = (value: number) => {
    setIntensityRPE(value);
  };

  const addWorkoutField = {
    title: "title",
    startTime: "startTime",
    duration: "duration",
    calories: "calories",
    powerAverage: "powerAverage",
    intensity: "intensity",
    description: "description",
    keyPerformance: "keyPerformance",
    competition: "competition",
    date: "date",
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IAddWorkout>({
    mode: "all",
    defaultValues: {
      title: "",
      date: dayjs(date.replace("Z", "")).format("DD/MM/YYYY"),
      startTime: "",
      duration: "00:00:00",
      calories: null,
      powerAverage: null,
      description: "",
      keyPerformance: false,
      competition: false,
    },
  });

  useEffect(() => {
    if (!editItem) {
      initSet();
      return;
    }

    const startTime = dateToHHMM(editItem?.start);
    const selectedTime = startTime === "00:00" ? undefined : { label: startTime, value: startTime };
    setSelectedTime(selectedTime);

    const intensity = Workout_Intensity.Light;
    setIntensity(intensity);

    setIntensityRPE(editItem?.intensityRPE ?? 0);

    setKeyChecked(editItem?.key);
    setCompetitionChecked(editItem?.competition);
    const currentDuration = millisecondsToHMS(editItem?.start, editItem?.end);
    setDuration(currentDuration);

    reset({
      title: editItem?.title ?? "",
      date: dayjs(date).format("DD/MM/YYYY"),
      startTime: editItem?.start ?? "",
      calories: (editItem?.calories as number) > 0 ? editItem?.calories : null,
      description: editItem?.description ?? "",
      keyPerformance: editItem?.key as boolean,
      competition: editItem?.competition as boolean,
      powerAverage: (editItem?.powerAverage as number) > 0 ? editItem?.powerAverage : null,
    });

    if (isInCompleted) {
      setErrorMsgs(prev => ({
        ...prev,
        startTime: startTime == "00:00" ? "Info required" : null,
        duration: currentDuration === "00:00:00" ? "Info required" : null,
      }));
    }
  }, [editItem?.id]);

  const checkErrors = (values: IAddWorkout) => {
    const errors = {
      startTime: !selectedTime ? "Info required" : null,
      duration: values.duration === "00:00:00" ? "Info required" : null,
    };

    setErrorMsgs(prev => ({ ...prev, ...errors }));

    return Object.values(errors).some(error => error !== null) || !selectedTime;
  };

  const calculateDuration = (duration: string) => {
    const [hour, min, sec] = (duration || "").split(":").map(Number);
    return (hour * 3600 + min * 60 + sec) * 1000;
  };

  const formatDate = (date: string, groupId: string) => {
    return groupId ? dayjs(selectedDate).format("YYYY-MM-DD") : dayjs(date.replace("Z", "")).format("YYYY-MM-DD");
  };

  const createWorkoutInput = (values: IAddWorkout, start: Date, end: Date, utcOffset: number) => {
    return {
      activityId,
      competition: values.competition,
      key: values.keyPerformance,
      intensityRPE,
      calories: currency(values.calories || 0).value,
      start,
      end,
      description: values.description,
      title: values.title,
      utcOffset,
      powerAverage: currency(values.powerAverage || 0).value,
      source: Workout_Source.Coach,
    };
  };

  const createWorkoutUpdate = (values: IAddWorkout, start: Date, end: Date, utcOffset: number, handleType: string) => {
    return {
      activityId: editItem?.activity?.id,
      competition: values.competition,
      key: values.keyPerformance,
      intensityRPE,
      calories: currency(values.calories || 0).value,
      start,
      end,
      description: values.description,
      title: values.title,
      utcOffset,
      powerAverage: currency(values.powerAverage || 0).value,
      intraFuelling: editItem?.intraFuelling,
      status: handleType === "add" ? Workout_Status.Active : Workout_Status.Discarded,
    };
  };

  const addWorkout = useCallback(
    async (values: IAddWorkout, handleType: string) => {
      try {
        setInputFocus(initFocus);

        if (checkErrors(values)) return;
        debugger;
        const totalDurationMilSeconds = calculateDuration(values.duration);

        const utcOffsetMins = groupId ? dayjs(selectedDate).utcOffset() : dayjs(date).utcOffset();

        const utcOffset = currency(utcOffsetMins).divide(60).value;

        let nowDate = formatDate(date, groupId ?? "");

        let start = dayjs(`${nowDate} ${selectedTime?.value}`, "YYYY-MM-DD HH:mm").toDate();
        start = new Date(`${dayjs(start).format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`);

        let end = new Date(start.getTime() + totalDurationMilSeconds + new Date().getTimezoneOffset() * 60 * 1000);

        let endOfDay = dayjs(nowDate).endOf("day").toDate();
        if (end.getTime() > endOfDay.getTime()) {
          end = endOfDay;
        }

        end = new Date(`${dayjs(end).format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`);

        const workoutInput = createWorkoutInput(values, start, end, utcOffset);
        const workoutUpdate = createWorkoutUpdate(values, start, end, utcOffset, handleType);

        if (groupId) {
          await addGroupWorkoutM({
            id: groupId,
            input: workoutInput,
          });
        } else {
          if (editItem?.id) {
            await updateExistWorkout({
              id: editItem?.id,
              input: workoutUpdate,
              userId: selectedClient?.id,
            });
          } else {
            await addNewWorkout({
              input: workoutInput,
              userId: athleteId,
            });
          }
        }

        refetchClentWeek();
        initSet();
        setAddWorkoutModal(false);
      } catch (error) {
        console.log(error);
      }
    },
    [
      setInputFocus,
      setErrorMsgs,
      selectedTime,
      groupId,
      selectedDate,
      date,
      activityId,
      editItem,
      addGroupWorkoutM,
      updateExistWorkout,
      addNewWorkout,
      athleteId,
      refetchClentWeek,
      initSet,
      setAddWorkoutModal,
    ],
  );
  const Option: FC<OptionProps<ITime>> = props => <components.Option {...props}>{props.data.label}</components.Option>;

  const SingleValue: FC<SingleValueProps<ITime>> = ({ children, ...props }) => {
    return <components.SingleValue {...props}>{children}</components.SingleValue>;
  };

  const setOnlyNumbers = (e: any) => {
    const {
      key,
      target: { value: currentValue },
    } = e;
    if ((currentValue === "" && key === "0") || !"0123456789Backspace".includes(key)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const selectFocus = (key: string): void => {
    let focus: IInputFocus = { ...initFocus };
    (focus as any)[key] = true;
    setInputFocus(focus);
  };
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [showDayPicker, setShowDayPicker] = useState(false);

  return showAddWorkoutModal ? (
    <>
      <IntensityScaleModal show={showIntensityInfo} setShow={setShowIntensityInfo} />
      <div className="absolute z-10 h-full w-full bg-black/70 flex justify-center items-start p-10 overflow-y-auto">
        <div className="flex flex-col gap-8 bg-background-300 min-w-[800px]  p-6 rounded-[20px] relative">
          <div className="absolute -right-3 -top-3">
            <div className="bg-background-500 p-3 rounded-full w-12 h-12 flex justify-center items-center absolute right-0">
              <div
                onClick={() => {
                  setAddWorkoutModal(false);
                  initSet();
                }}
                className="bg-activeblue-100 p-3 rounded-full w-10 h-10 hover:cursor-pointer flex justify-center items-center"
              >
                <CancelIcon />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {Icon && <Icon color="#FFF" width={iconWidth} height={iconHeight} />}
            <p className="text-[20px] font-semibold mr-3">
              {editItem
                ? `${isCompleted ? "Completed" : "Edit"} ${editItem?.activity?.name} Workout `
                : name
                  ? `Add ${name} Workout`
                  : "Add Workout"}
            </p>
            {wearableIcon && (
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img src={wearableIcon?.icon} width={24} height={24} className={"rounded-[4px]"} />
            )}
          </div>
          {isInCompleted && (
            <div className=" flex py-2 px-3 flex-col items-start gap-1 self-stretch rounded-xl bg-lightgrey2-700 shadow-md">
              <div className="flex items-center gap-2 self-stretch">
                <InfoIcon color="white" width={20} height={20} />
                <span className="text-white text-xs tracking-[0.25px]">
                  This workout has been imported from TrainingPeaks. Please add the information required.
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full">
            <div className={`bg-background-500 rounded-md py-3 px-4 w-2/3 ${inputFocus.title ? showOutline : ""}`}>
              <label className="text-[10px] block text-activeblue-100 uppercase tracking-widest font-semibold leading-4">
                WORKOUT TITLE
              </label>
              <InputField
                id={addWorkoutField.title}
                name={addWorkoutField.title}
                control={control}
                errors={errors.title?.message}
                className={`w-full bg-background-900 tracking-[0.15px] placeholder-white placeholder-opacity-50 text-left ${isInCompleted && "opacity-50"}`}
                placeholder="Untitled Workout"
                showError={false}
                inputStyle={{ minHeight: "24px" }}
                onMouseDown={() => {
                  selectFocus("title");
                }}
                disabled={isInCompleted}
              />
            </div>
            <div className="flex space-x-3">
              <div
                className={`w-1/3 bg-background-500 rounded-md py-3 px-4 flex items-center space-between relative h-[64px] ${
                  inputFocus.date ? showOutline : ""
                }`}
              >
                <div className="w-full">
                  <label className="text-xxs block text-activeblue-100 font-semibold tracking-widest leading-4">DATE</label>
                  {groupId ? (
                    <>
                      <p onClick={() => setShowDayPicker(!showDayPicker)} className="text-white opacity-50 cursor-pointer">
                        {dayjs(selectedDay).format("DD/MM/YYYY")}
                      </p>
                      {showDayPicker && (
                        <div className="flex flex-col absolute bg-background-300 rounded-lg z-50 ">
                          <DayPicker
                            mode="single"
                            selected={selectedDay}
                            onSelect={input => {
                              setSelectedDay(input);
                              setShowDayPicker(!showDayPicker);
                            }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-white opacity-50">{dayjs(date.replace("Z", "")).format("DD/MM/YYYY")}</p>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  <CalendarIcon width={18} height={18} />
                </div>
              </div>
              <div
                className={`w-1/3 relative bg-background-500 rounded-md py-3 px-4 h-[64px] ${
                  inputFocus.start ? showOutline : ""
                } ${errorMsgs.startTime ? showErrorline : ""}`}
              >
                <label className="text-xxs block text-activeblue-100 font-semibold tracking-widest leading-4">START TIME</label>
                <div onMouseDown={() => selectFocus("start")}>
                  <Select
                    value={selectedTime}
                    //@ts-ignore
                    onChange={(option: ITime, actionMeta: ActionMeta<ITime>) =>
                      handleChange({
                        label: option?.label,
                        value: option?.value,
                      })
                    }
                    placeholder="Choose"
                    //@ts-ignore
                    styles={selectStyles}
                    options={timeOptions}
                    components={{
                      Option,
                      SingleValue,
                      IndicatorSeparator: () => null,
                    }}
                    maxMenuHeight={250}
                  />
                </div>
                <div className="absolute -bottom-8">
                  {errorMsgs.startTime && <ErrorText error={errorMsgs.startTime} className="-ml-3" />}
                </div>
              </div>
              <div
                className={`w-1/3 relative bg-background-500 rounded-md py-3 px-4 h-[64px] ${
                  inputFocus.duration ? showOutline : ""
                }${errorMsgs.duration ? showErrorline : ""}`}
              >
                <p className="text-xxs  text-activeblue-100  font-semibold tracking-widest">DURATION</p>
                <div
                  onMouseDown={() => {
                    selectFocus("duration");
                  }}
                >
                  <DurationPicker
                    value={duration}
                    setValue={value => {
                      setValue("duration", value);
                      setDuration(value);
                    }}
                    isDisabled={false}
                  />
                </div>
                <div className="absolute -bottom-8">
                  {errorMsgs.duration && <ErrorText error={errorMsgs.duration} className="!mt-2.5 -ml-3 " />}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-lightgrey2-700 rounded-[20px] flex justify-between gap-6">
            <div className="w-1/2 flex flex-col gap-3">
              {isFuelPlanPage && (
                <>
                  <div
                    className={`bg-background-500 rounded-md py-3 px-4 overflow-hidden h-[64px] ${inputFocus.calories ? showOutline : ""}`}
                  >
                    <label className="text-xxs block text-activeblue-100 font-semibold tracking-widest leading-4">CALORIES</label>
                    <InputField
                      id={addWorkoutField.calories}
                      name={addWorkoutField.calories}
                      control={control}
                      errors={errors.calories?.message}
                      type="number"
                      className="w-full bg-background-900 tracking-[0.15px] placeholder-white placeholder-opacity-50 text-left"
                      placeholder="Enter Calories (Optional)"
                      inputStyle={{ minHeight: 24 }}
                      //@ts-ignore
                      min={0}
                      onKeyDown={e => setOnlyNumbers(e)}
                      onMouseDown={() => {
                        selectFocus("calories");
                      }}
                    />
                  </div>
                  {needToShowAVGPower && (
                    <div
                      className={`bg-background-500 rounded-md py-3 px-4 overflow-hidden h-[64px] ${
                        inputFocus.powerAverage ? showOutline : ""
                      }`}
                    >
                      <label className="text-xxs block text-activeblue-100 font-semibold tracking-widest leading-4">AVERAGE POWER</label>
                      <InputField
                        id={addWorkoutField.powerAverage}
                        name={addWorkoutField.powerAverage}
                        control={control}
                        errors={errors.powerAverage?.message}
                        type="number"
                        className="w-full bg-background-900 tracking-[0.15px] placeholder-white placeholder-opacity-50 text-left"
                        placeholder="Enter Watts (Optional)"
                        inputStyle={{ minHeight: 24 }}
                        //@ts-ignore
                        min={0}
                        onKeyDown={e => setOnlyNumbers(e)}
                        onMouseDown={() => {
                          selectFocus("powerAverage");
                        }}
                      />
                    </div>
                  )}
                </>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Intensity</p>
                  <div
                    data-tooltip-id="info-icon"
                    data-tooltip-content={intensityDetail}
                    onClick={() => {
                      setShowIntensityInfo(true);
                    }}
                  >
                    <InfoIcon />
                  </div>
                </div>
                <div className="w-full mb-6 mt-12">
                  <ReactSlider
                    min={0}
                    max={100}
                    value={intensityRPE}
                    onChange={changeIntensity}
                    thumbClassName="thumb"
                    trackClassName="track"
                    renderTrack={(props, state) => (
                      <div
                        {...props}
                        contentEditable={undefined}
                        className={clsx(`h-3 shrink-0 rounded-lg`, {
                          "bg-background-500": state.index === 1,
                          "bg-activeblue-100": state.index === 0,
                        })}
                        style={{
                          transform: "translateY(-50%)",
                          ...props.style,
                        }}
                      />
                    )}
                    renderThumb={props => (
                      <div
                        {...props}
                        contentEditable={undefined}
                        className="relative w-8 h-8 shrink-0 rounded-full bg-white shadow-[0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 1px 3px 0px rgba(16, 24, 40, 0.20)]"
                        style={{
                          transform: "translateY(-50%)",
                          ...props.style,
                        }}
                      >
                        <div
                          className="absolute -top-2 flex py-1 px-2 justify-center items-center bg-background-900 gap-2 rounded-sm"
                          style={{
                            transform: "translateY(-100%)",
                            left: `${intensityTitlePosition}px`,
                          }}
                        >
                          <span className="text-lightgrey1-700 text-xs font-normal tracking-[0.25px] whitespace-nowrap">
                            {sliderIntensityTitle}
                          </span>
                          <span className="text-lightgrey1-700 text-xs font-semibold tracking-[0.25px]">{intensityRPE}</span>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Workout Detail</p>
                  <div data-tooltip-id="info-icon" data-tooltip-content={workoutDetail}>
                    <InfoIcon />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bg-background-500 rounded-md flex items-center justify-between px-4 py-3">
                    <label className="label block relative cursor-pointer container p-0">
                      <div className="flex items-center gap-2">
                        <KeyPerformanceIcon color="#359CEF" width={18} height={18} />
                        <p className="label-text text-white">Key Performance</p>
                      </div>
                      <input
                        onChange={() => {
                          if (isInCompleted) return;
                          setKeyChecked(prev => !prev);
                          setValue("keyPerformance", !keyChecked);
                        }}
                        name={addWorkoutField.keyPerformance}
                        type="checkbox"
                        checked={keyChecked}
                        value={addWorkoutField.keyPerformance}
                        className="h-0 w-0 absolute"
                      />
                      <span className="checkmark checkmark-workout-modal !mt-0"></span>
                    </label>
                  </div>
                  <div className="bg-background-500 rounded-md flex items-center justify-between px-4 py-3">
                    <label className="label block relative cursor-pointer container p-0">
                      <div className="flex items-center gap-2">
                        <TrophyIcon color="#359CEF" width={18} height={18} />
                        <p className="label-text text-white">Competition</p>
                      </div>
                      <input
                        onChange={() => {
                          if (isInCompleted) return;
                          setCompetitionChecked(prev => !prev);
                          setValue("competition", !competitionChecked);
                        }}
                        name={addWorkoutField.competition}
                        type="checkbox"
                        checked={competitionChecked}
                        value={addWorkoutField.competition}
                        className="h-0 w-0 absolute"
                      />
                      <span className="checkmark checkmark-workout-modal !mt-0"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={clsx(`w-1/2 bg-background-500 rounded-lg px-4 py-3`, {
                [showOutline]: inputFocus.description,
                "max-h-[381px]": needToShowAVGPower,
                "max-h-[312px]": !needToShowAVGPower,
              })}
            >
              <label className="text-xxs text-activeblue-100 font-semibold tracking-widest leading-4">DESCRIPTION</label>
              <div onMouseDown={() => selectFocus("description")}>
                <TextArea
                  id={addWorkoutField.description}
                  name={addWorkoutField.description}
                  control={control}
                  placeholder="Enter Description (optional)"
                  className={`w-full text-sm font-normal !min-h-[344px] bg-inherit outline-none resize-none placeholder-white placeholder-opacity-50 ${isInCompleted ? "opacity-50" : ""}`}
                  disabled={isInCompleted}
                />
              </div>
            </div>
          </div>
          <div className={`flex justify-center  ${editItem ? "gap-x-3" : ""}`}>
            {editItem && !isInCompleted && (
              <Button
                loading={isLoading || isLoadingGW || isLoadingUW}
                text="Delete"
                icon={<TrashIcon width={24} height={24} />}
                onClick={handleSubmit((data: IAddWorkout) => addWorkout(data, "delete"))}
                className="bg-carbcodelow-600 py-2 px-6 rounded-[10px] flex justify-between items-center"
                overrideClassName
                disabled={isLoading || isLoadingGW || isLoadingUW}
              />
            )}

            <Button
              loading={isLoading || isLoadingGW || isLoadingUW}
              text={editItem ? "Save" : "Add Workout"}
              onClick={handleSubmit((data: IAddWorkout) => addWorkout(data, "add"))}
              className={`bg-activeblue-100 py-2 px-6 lg:w-[250px] md:w-[250px] w-[202px] rounded-[10px] ${
                isInCompleted && (!selectedTime || selectedTime?.value == "00:00" || duration === "00:00:00") ? "opacity-20" : ""
              }`}
              overrideClassName
              disabled={
                (isInCompleted && (!selectedTime || selectedTime?.value == "00:00" || duration === "00:00:00")) ||
                isLoading ||
                isLoadingGW ||
                isLoadingUW
              }
            />
          </div>
        </div>
        <Tooltip id="info-icon" className="!w-[400px] z-50" />
      </div>
    </>
  ) : null;
};

export default AddWorkoutModal;
