import { CancelIcon } from "hexis/components/icons/general";
import React from "react";

const DayNoteModal = ({
  content,
  setShowDayNoteModal,
  showDayNoteModal,
}: {
  content?: {
    title: string;
    body: string;
  };
  setShowDayNoteModal: Function;
  showDayNoteModal: boolean;
}) => {
  return showDayNoteModal ? (
    <div className="absolute z-10 h-full w-full bg-black/75 flex justify-center items-center">
      <div className="flex flex-col bg-background-200 w-[500px] p-4 rounded-lg relative">
        <div className="absolute -right-3 -top-3">
          <div className="bg-background-500 p-3 rounded-full w-12 h-12 flex justify-center items-center absolute right-0">
            <div
              onClick={() => setShowDayNoteModal(false)}
              className="bg-activeblue-100 p-3 rounded-full w-10 h-10 hover:cursor-pointer flex justify-center items-center"
            >
              <CancelIcon />
            </div>
          </div>
        </div>
        <div className="relative">
          <p className="py-2 font-semibold text-lg">{content?.title}</p>
          <p className="text-sm font-normal break-words">{content?.body}</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default DayNoteModal;
