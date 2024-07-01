import React from "react";

interface IProps {
  noteTitle: string;
  noteSubtitle: string;
  date: string;
}

const LeftSideNewNote = ({ noteTitle, noteSubtitle, date }: IProps) => {
  return (
    <div className="bg-activeblue-100 h-[91px] px-[38px] py-4 rounded-tl-lg">
      <div className="h-[38px] flex flex-col justify-between">
        <h1 className="text-sm font-medium">{`${noteTitle?.length > 36 ? `${noteTitle?.slice(0, 35)}...` : noteTitle}`}</h1>
        <p className="font-normal text-xxs flex-wrap leading-[-0.3px]">{`${
          noteSubtitle?.length > 55 ? `${noteSubtitle?.slice(0, 54)}...` : noteSubtitle
        }`}</p>
      </div>

      <p className="text-xxs font-medium pt-[7px]">{date}</p>
    </div>
  );
};

export default LeftSideNewNote;
