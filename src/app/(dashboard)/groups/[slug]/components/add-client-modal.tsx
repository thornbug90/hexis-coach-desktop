"use client";

import React, { useState } from "react";
import ModalContent from "./add-client-content";
import { CloseIcon } from "hexis/components/icons/general";
import clsx from "clsx";

interface IProps {
  className?: string;
  buttonText?: string;
}

const AddClientsModal = ({ className, buttonText = "Add Clients" }: IProps) => {
  const [modalToggle, setModalToggle] = useState(false);

  return (
    <div className="relative">
      {/* invite clients button */}
      <label
        htmlFor="add_group_clients_modal"
        className={clsx(className, "cursor-pointer rounded-lg flex items-center", {
          "gap-1 px-4 py-3 bg-activeblue-100 min-w-[126px] w-full h-[63px]": !className,
        })}
      >
        <p>+</p>
        <p className="text-sm">{buttonText}</p>
      </label>

      {/* The modal to invite clients */}
      <input
        type="checkbox"
        id="add_group_clients_modal"
        checked={modalToggle}
        className="modal-toggle"
        onClick={() => {
          setModalToggle(!modalToggle);
        }}
        onChange={() => {}}
      />

      <div className="modal">
        <div className="modal-box min-w-[310px] max-w-[550px] overflow-visible backdrop-blur shadow-[0px 4px 6px -2px rgba(0, 0, 0, 0.5)] bg-background-300 rounded-[20px] relative z-10 mx-4">
          <label htmlFor="add_group_clients_modal">
            <span className="p-4 rounded-full bg-activeblue-100 absolute -top-4 -right-4 z-20 border-6 border-background-800">
              <CloseIcon />
            </span>
          </label>

          {/* modals content */}
          {/* @ts-ignore TODO: Property 'setModalToggle' does not exist on type 'IntrinsicAttributes'. */}
          <ModalContent setModalToggle={setModalToggle} />
        </div>

        <label className="modal-backdrop" htmlFor="add_group_clients_modal">
          Close
        </label>
      </div>
    </div>
  );
};

export default AddClientsModal;
