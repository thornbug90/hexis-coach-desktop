import React, { FC, useState } from "react";
import Select, { ActionMeta, StylesConfig, components, OptionProps, SingleValueProps } from "react-select";
import { CancelIcon } from "hexis/components/icons/general";
import {
  BasketballIcon,
  CrossTrainingIcon,
  CyclingIcon,
  FootballIcon,
  FunctionalFitnessIcon,
  MobilityIcon,
  MountainBikingIcon,
  RugbyUnionIcon,
  RunningContinuousIcon,
  StrengthTrainingIcon,
  SwimmingIcon,
  TriathlonIcon,
} from "hexis/components/icons/sports";
import activities from "hexis/constants/activities";
import clsx from "clsx";
import { useAppSelector } from "hexis/hooks/useRedux";
import { IState } from "hexis/state/state";

const ChooseActivityModal = ({
  setShowActivityModal,
  showActivityModal,
  setShowAddWorkoutModal,
  setActivityId,
  isFuelPlanPage = true,
}: {
  setShowActivityModal: Function;
  showActivityModal: boolean;
  setShowAddWorkoutModal: Function;
  setActivityId: Function;
  isFuelPlanPage?: boolean;
}) => {
  const selectStyles: StylesConfig = {
    //@ts-ignore
    control: styles => ({
      ...styles,
      backgroundColor: "#18162D",
      color: "#FFF",
      borderWidth: 0,
      height: "20px",
      marginTop: "10px",
      display: "flex",
      padding: "0",
      boxShadow: "0 !important",
      ":hover": {
        border: "0 !important",
      },
      cursor: "pointer",
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
      marginTop: "10px",
      outlineStyle: "none",
      outline: "none",
      display: "flex",
      alignItems: "center",
      paddingVertical: "10px",
      ":hover": {
        outlineStyle: "none",
      },
      cursor: "pointer",
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
    }),
    menuList: base => ({
      ...base,
      maxHeight: Math.max(typeof base.maxHeight === "number" ? (base.maxHeight as number) : 0, 200),
    }),
  };

  const popularActivityList = [
    { id: "ckysvfaax0031y9s7xa3uasmh", name: "Cycling", icon: CyclingIcon },
    { id: "ckysvfab10101y9s73o7sc7io", name: "Running", icon: RunningContinuousIcon },
    { id: "ckysvfab20126y9s7h97c2yuz", name: "Swimming", icon: SwimmingIcon },
    { id: "ckysvfab30134y9s76rwpe9ti", name: "Triathlon", icon: TriathlonIcon },
    { id: "ckysvfaaz0076y9s7vs4tybwf", name: "Mountain Biking", icon: MountainBikingIcon },
    { id: "ckysvfaaw0026y9s74u820e3w", name: "Cross Training", icon: CrossTrainingIcon },
    { id: "ckysvfab20124y9s7dbft1vo0", name: "Strength Training", icon: StrengthTrainingIcon },
    { id: "ckysvfaax0039y9s7nhbh9x52", name: "Functional Fitness", icon: FunctionalFitnessIcon },
    { id: "ckysvfaax0038y9s73bqd5siz", name: "Football", icon: FootballIcon },
    { id: "ckysvfaau0007y9s7jlztylmc", name: "Basketball", icon: BasketballIcon },
    { id: "ckysvfab10100y9s7nbhoe7us", name: "Rugby Union", icon: RugbyUnionIcon },
    { id: "ckysvfaaz0074y9s7z1zeg7ub", name: "Mobility", icon: MobilityIcon },
  ];
  const activityList = Object.values(activities);

  const [activityOptions, setActivityOptions] = useState<IActivity[]>(
    activityList.map(activity => ({ value: activity.id, label: activity.name, icon: activity.icon })),
  );
  const selectedClient = useAppSelector((state: IState) => state.user.selectedClient);
  const favouriteActivityList = selectedClient?.favouriteActivities?.map(activity => ({
    id: activity?.activity.id as string,
    name: activity?.activity.name as string,
    icon: activities?.[activity?.activityId as keyof typeof activities],
  }));
  interface IActivity {
    value: string;
    label: string;
    icon: any;
  }

  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const handleChange = (value: IActivity) => {
    setSelectedActivity(value);
    setActivityId(value.value);
    setShowActivityModal(false);
    setShowAddWorkoutModal(true);
  };
  const onInputChange = (e: string) => {
    const resultArray = activityList
      .filter(obj => {
        return obj.name.toLowerCase().includes(e.toLowerCase());
      })
      .map(activity => ({
        value: activity.id,
        label: activity.name,
        icon: activity.icon,
      }));
    setActivityOptions(resultArray);
  };
  const Option: FC<OptionProps<IActivity>> = props => (
    <components.Option {...props}>
      <props.data.icon
        color="#FFF"
        width={props.data.label === "Triathlon" ? 60 : 25}
        height={props.data.label === "Triathlon" ? 60 : 25}
        style={{ marginRight: "20px" }}
      />
      {props.data.label}
    </components.Option>
  );

  const SingleValue: FC<SingleValueProps<IActivity>> = ({ children, ...props }) => {
    return (
      <components.SingleValue {...props}>
        {/* @ts-ignore */}
        <selectedActivity.icon
          color="#FFF"
          width={props.data.label === "Triathlon" ? 60 : 25}
          height={props.data.label === "Triathlon" ? 60 : 25}
          style={{
            paddingRight: "10px",
          }}
        />
        {children}
      </components.SingleValue>
    );
  };

  return showActivityModal ? (
    <div className="absolute z-10 h-screen w-screen  bg-black/75 flex justify-center items-center bg-opacity-0 overflow-scroll">
      <div
        className={clsx(
          "flex flex-col gap-8 bg-background-300 w-[800px] p-6 rounded-[20px] relative",
          isFuelPlanPage && "h-[590px]",
          window.outerHeight < 1000 && `!absolute top-10`,
        )}
      >
        <div className="absolute -right-3 -top-3">
          <div className="bg-background-500 p-3 rounded-full w-12 h-12 flex justify-center items-center absolute right-0">
            <div
              onClick={() => setShowActivityModal(false)}
              className="bg-activeblue-100 p-3 rounded-full w-10 h-10 hover:cursor-pointer flex justify-center items-center"
            >
              <CancelIcon />
            </div>
          </div>
        </div>
        <p className="text-[20px] font-semibold">Choose Activity</p>
        {isFuelPlanPage && favouriteActivityList && (
          <div>
            <p className="mb-3 font-medium">Favorites</p>
            <div className="grid grid-cols-4 gap-2">
              {favouriteActivityList.map((activity, index) => {
                const { icon: Icon, name, id } = activity;
                const iconWidth = name === "Triathlon" ? 60 : 25;
                const iconHeight = name === "Triathlon" ? 60 : 25;
                return (
                  <div
                    key={index}
                    onClick={() => handleChange({ icon: () => Icon.icon, label: name, value: id })}
                    className="bg-background-500 hover:bg-darkgrey1-600 rounded-lg flex gap-3 items-center h-[56px] px-4 m-0 hover:cursor-pointer"
                  >
                    {Icon.icon && <Icon.icon color="#FFF" width={iconWidth} height={iconHeight} />}
                    <p className="text-sm">{name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div>
          <p className="mb-3 font-medium">Most Popular</p>
          <div className="grid grid-cols-4 gap-2">
            {popularActivityList.map((activity, index) => {
              const { icon: Icon, name, id } = activity;
              const iconWidth = name === "Triathlon" ? 60 : 25;
              const iconHeight = name === "Triathlon" ? 60 : 25;
              return (
                <div
                  key={index}
                  onClick={() => handleChange({ icon: () => Icon, label: name, value: id })}
                  className="bg-background-500 hover:bg-darkgrey1-600 rounded-lg flex gap-3 items-center h-[56px] px-4 m-0 hover:cursor-pointer"
                >
                  {Icon && <Icon color="#FFF" width={iconWidth} height={iconHeight} />}
                  <p className="text-sm">{activity.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/2">
          <p className="mb-3 font-medium">Search Activity</p>
          <div className="bg-background-500 h-[64px] rounded-md p-3 relative">
            <p className="text-activeblue-100 text-xxs font-semibold tracking-widest absolute z-10">SEARCH ACTIVITY</p>
            <Select
              value={selectedActivity}
              //@ts-ignore
              onChange={(option: IActivity, actionMeta: ActionMeta<IActivity>) => {
                handleChange({ icon: option?.icon, label: option?.label, value: option?.value });
              }}
              onInputChange={value => onInputChange(value)}
              placeholder="Choose"
              //@ts-ignore
              styles={selectStyles}
              options={activityOptions.sort((a, b) => a.label.localeCompare(b.label))}
              components={{ Option, SingleValue, IndicatorSeparator: () => null }}
              maxMenuHeight={250}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ChooseActivityModal;
