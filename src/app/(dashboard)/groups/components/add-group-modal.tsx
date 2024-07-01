"use client";

import React, { useEffect, useRef, useState } from "react";
import ModalContent from "./add-group-content";
import { CloseIcon, PencilIcon } from "hexis/components/icons/general";
import clsx from "clsx";

type Props = {
  className?: string;
  buttonText?: string;
  editMode?: boolean;
};

const AddGroupModal = ({ className, buttonText = "Add Group", editMode = false }: Props) => {
  const [modalToggle, setModalToggle] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalToggle(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative">
      {/* invite clients button */}
      {editMode ? (
        <label htmlFor="my_modal_7" className={"cursor-pointer rounded-full flex items-center bg-white bg-opacity-10 px-3 py-2 gap-1"}>
          <PencilIcon />
          <p className="gray-400">Edit Group</p>
        </label>
      ) : (
        <label
          htmlFor="my_modal_7"
          className={clsx(className, "cursor-pointer rounded-lg flex items-center", {
            "gap-1 px-4 py-3 bg-activeblue-100": !className,
          })}
        >
          <p>+</p>
          <p>{buttonText}</p>
        </label>
      )}

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

      <div className="modal" ref={modalRef}>
        <div className="modal-box max-w-[600px] max-h-[934px] overflow-visible backdrop-blur shadow-[0px 4px 6px -2px rgba(0, 0, 0, 0.5)] bg-background-300 rounded-[20px] relative z-10 mx-4 p-6">
          <label htmlFor="my_modal_7">
            <span className="p-4 rounded-full bg-activeblue-100 absolute -top-4 -right-4 z-20 border-6 border-background-800">
              <CloseIcon />
            </span>
          </label>

          {/* modals content */}
          <ModalContent setModalToggle={setModalToggle} editMode={editMode} modalToggle={modalToggle} />
        </div>

        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default AddGroupModal;
