import React from "react";
import { IProfileProps } from "../page";
import InputItem, { IInputItemProps } from "hexis/components/common/input-item";
import { convertCamelCaseToUpperCaseWithSpaces, getNumberTimeFromStringTime } from "hexis/utils/common";
import FuelWizardIcon from "hexis/components/icons/general/FuelWizard";
import activities from "hexis/constants/activities";
import { CheckIcon, InfoIcon } from "hexis/components/icons/general";
type Props = {
  profile: IProfileProps;
  setProfile: React.Dispatch<React.SetStateAction<IProfileProps>>;
};

const EnergyRedstributionItem = () => {
  return (
    <div className="flex h-16 px-4 py-3 items-center justify-between gap-3 self-stretch rounded-lg bg-background-300">
      <div className="flex gap-2 items-center">
        <FuelWizardIcon />
        <span className="text-white/50 bg-background-300 font-normal text-base tracking-[0.25px] w-full text-left mt-1 leading-8">
          Energy Redistribution
        </span>
        <div className="mt-1 relative group">
          <InfoIcon className="w-5 h-5 text-white" />
          <div className="absolute -translate-x-1/2 bottom-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex w-[300px] p-3 flex-col justify-center items-start gap-2 rounded-lg bg-lightgrey2-700">
              <div className="flex gap-2 items-center">
                <InfoIcon className="w-5 h-5 text-white" />
                <span className="text-white text-sm tracking-wider font-medium">Energy Redistribution</span>
              </div>
              <div className="self-stretch text-white tracking-[0.25px] font-normal text-xs">
                Adjusts energy distribution over a 72 hour period to enhance performance{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-6 h-6 justify-center items-center rounded-sm bg-activeblue-100 opacity-50">
        <CheckIcon className="w-4 h-4 text-white" width={20} height={20} />
      </div>
    </div>
  );
};
const BasicSettings: React.FC<Props> = ({ profile }) => {
  const getWorkoutItem = (id: string) => {
    const activity = activities[id as keyof typeof activities];
    return activity
      ? { title: "regularWorkout", value: activity.name, leftIcon: activity.icon }
      : { title: "regularWorkout", value: "-", leftIcon: null };
  };

  const firstSide: IInputItemProps[] = [
    { title: "name", value: profile.name },
    { title: "sex", value: profile.sex },
    { title: "dateOfBirth", value: profile.dateOfBirth ?? "-" },
    { title: "height", value: !!profile.height ? profile.height?.toString() + " cm" : "-" },
    { title: "timeZone", value: profile.timeZone },
  ];

  const secondSide: IInputItemProps[] = [
    { title: "goal", value: profile.goal },
    { title: "currentWeight", value: !!profile.currentWeight ? profile.currentWeight?.toString() + " kg" : "-" },
    { title: "targetWeight", value: !!profile.targetWeight ? profile.targetWeight?.toString() + " kg" : "-" },
    { title: "bodyFat", value: profile.bodyFat },
    { title: "efficiency - cycling", value: profile.efficiency },
  ];

  const thirdSide: IInputItemProps[] = [
    {
      title: "primarySport",
      value: activities[profile.primarySport as keyof typeof activities]?.name,
      leftIcon: activities[profile.primarySport as keyof typeof activities]?.icon,
    },
    ...Array(3)
      .fill(null)
      .map((_, index) => getWorkoutItem(profile?.regularWorkout?.[index])),
    {
      title: "workoutHoursPerWeek",
      value: getNumberTimeFromStringTime(profile.workoutHoursPerWeek),
    },
  ];
  const FirstSideComponent = () => {
    return (
      <div className="flex flex-col justify-center items-start gap-3 flex-1">
        <span className="text-white font-medium text-base tracking-[0.4px] capitalize">Profile</span>
        {firstSide.slice(0, 5).map((field, index) => (
          <InputItem
            key={index}
            title={convertCamelCaseToUpperCaseWithSpaces(field.title || "")}
            value={field.value || ""}
            checkbox={field.checkbox || false}
            leftIcon={field.leftIcon || null}
          />
        ))}
        <div className="flex pt-6 flex-col justify-center items-start gap-3 self-stretch">
          <span className="text-white font-medium text-base tracking-[0.4px] capitalize">Features</span>
          <EnergyRedstributionItem />
        </div>
      </div>
    );
  };

  const SecondSideComponent = () => {
    return (
      <div className="flex flex-col justify-center items-start gap-3 flex-1">
        <span className="text-white font-medium text-base tracking-[0.4px] capitalize">Body Composition</span>
        {secondSide.slice(0, 4).map((field, index) => (
          <InputItem
            key={index}
            title={convertCamelCaseToUpperCaseWithSpaces(field.title || "")}
            value={field.value || ""}
            checkbox={field.checkbox || false}
            leftIcon={field.leftIcon || null}
          />
        ))}
        <div className="flex pt-6 flex-col justify-center items-start gap-3 self-stretch mt-[75px]">
          <span className="text-white font-medium text-base tracking-[0.4px] capitalize">Fitness</span>
          {secondSide.slice(4, 5).map((field, index) => (
            <InputItem
              key={index}
              title={convertCamelCaseToUpperCaseWithSpaces(field.title || "")}
              value={field.value || ""}
              checkbox={field.checkbox || false}
              leftIcon={field.leftIcon || null}
            />
          ))}
        </div>
      </div>
    );
  };

  const ThridSideComponent = () => {
    return (
      <div className="flex flex-col justify-center items-start gap-3 flex-1">
        <span className="text-white font-medium text-base tracking-[0.4px] capitalize">Activities</span>
        {thirdSide.map((field, index) => (
          <InputItem
            key={index}
            title={convertCamelCaseToUpperCaseWithSpaces(field.title || "")}
            value={field.value || "-"}
            checkbox={field.checkbox || false}
            leftIcon={field.leftIcon || null}
          />
        ))}
      </div>
    );
  };
  return (
    <React.Fragment>
      <div className="flex items-start gap-6 self-stretch">
        <FirstSideComponent />
        <SecondSideComponent />
        <ThridSideComponent />
      </div>
    </React.Fragment>
  );
};

export default BasicSettings;
