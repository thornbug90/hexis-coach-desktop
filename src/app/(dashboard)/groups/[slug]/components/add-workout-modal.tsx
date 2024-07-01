"use client";

import React, { useState } from "react";
import clsx from "clsx";
import AddWorkoutModal from "hexis/app/(client)/client-fuel-plan/components/add-workout-modal";

import { useAppSelector } from "hexis/hooks/useRedux";
import ChooseActivityModal from "hexis/app/(client)/client-fuel-plan/components/choose-activity-modal";

interface IProps {
  className?: string;
  buttonText?: string;
}

const AddGroupWorkoutModal = ({ className, buttonText = "Add Group Workout" }: IProps) => {
  const groupSelected = useAppSelector(state => state?.groups?.selectedGroup);

  const [showAddWorkoutModal, setAddWorkoutModal] = useState<boolean>(false);
  const [showActivityModal, setShowActivityModal] = useState<boolean>(false);
  const [activityId, setActivityId] = useState<string>("");

  return (
    <div className="relative">
      {/* invite clients button */}
      <label
        htmlFor="my_modal_3"
        className={clsx(className, "cursor-pointer rounded-lg flex items-center", {
          "gap-1 px-4 py-3 border-2 border-activeblue-100  min-w-[126px] w-full h-[63px]": !className,
        })}
      >
        <p>+</p>
        <p className="text-sm">{buttonText}</p>
      </label>

      {/* The modal to invite clients */}
      <input
        type="checkbox"
        id="my_modal_3"
        checked={showActivityModal || showAddWorkoutModal}
        className="modal-toggle"
        onClick={() => {
          setShowActivityModal(!showActivityModal);
        }}
        onChange={() => {}}
      />

      <div className="modal">
        {/* modals content */}

        <ChooseActivityModal
          setShowActivityModal={setShowActivityModal}
          showActivityModal={showActivityModal}
          setShowAddWorkoutModal={setAddWorkoutModal}
          setActivityId={setActivityId}
          isFuelPlanPage={false}
        />
        <AddWorkoutModal
          setAddWorkoutModal={setAddWorkoutModal}
          showAddWorkoutModal={showAddWorkoutModal}
          date={new Date().toString()}
          activityId={activityId}
          athleteId={undefined}
          groupId={groupSelected?.id}
          isFuelPlanPage={false}
          editItem={null}
        />

        <label className="modal-backdrop" htmlFor="my_modal_3">
          Close
        </label>
      </div>
    </div>
  );
};

export default AddGroupWorkoutModal;
