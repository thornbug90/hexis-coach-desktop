"use client"; // This is a client component
import React, { useState } from "react";
import ModalContent from "./modal-content";

const InviteClientsModal = () => {
  const [modalToggle, setModalToggle] = useState(false);
  return (
    <div className="relative">
      {/* invite clients button */}
      <label
        htmlFor="my_modal_7"
        className="relative flex flex-row items-center border-[1.5px] border-activeblue-100 rounded-md bg-background-300 py-2 px-[18px] h-10 w-[153px]"
      >
        <span className="font-medium text-xs tracking-[0.21px]">Invite clients</span>
        <span className="font-thin absolute right-[18px] text-xl top-0">+</span>
      </label>

      {/* The modal to invite clients */}
      <input
        type="checkbox"
        id="my_modal_7"
        checked={modalToggle}
        className="modal-toggle"
        onClick={() => {
          setModalToggle(!modalToggle);
        }}
        onChange={() => {}}
      />
      <div className="modal">
        <div className="modal-box w-[510px] overflow-hidden backdrop-blur shadow-[0px 4px 6px -2px rgba(0, 0, 0, 0.5)] bg-background-500 border-[0.82px] border-gray-500 border-opacity-40 rounded-[7px]">
          {/* gradient top highlight */}
          <div
            className="absolute w-[727.45px] h-[543.94px] -top-[420px] -left-[300px]"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, rgba(43, 217, 255, 0.2) 0%, rgba(46, 142, 255, 0) 100%)",
              transform: "rotate(90deg)",
              zIndex: -10,
            }}
          ></div>

          {/* modals content */}
          <ModalContent setModalToggle={setModalToggle} />

          {/* gradient bottom highlight */}
          <div
            className="absolute -left-20 -bottom-[400px] w-[727.45px] h-[543.94px]"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, rgba(43, 217, 255, 0.2) 0%, rgba(46, 142, 255, 0) 100%)",
              transform: "rotate(90deg)",
              zIndex: -10,
            }}
          ></div>
        </div>

        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default InviteClientsModal;
