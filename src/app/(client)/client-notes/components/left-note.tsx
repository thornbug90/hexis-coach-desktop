"use client";

import React from "react";
import dayjs from "dayjs";
import { Note } from "hexis/generated/graphql";

interface IProps {
  note: Note;
  onClick: (e: React.MouseEvent) => void;
}

export const LeftSideNote = ({ note, onClick }: IProps) => {
  return (
    <div onClick={onClick}>
      <div className="h-[38px] flex flex-col justify-between">
        <h1 className="text-sm font-medium">{`${note.title?.length > 36 ? `${note?.title?.slice(0, 35)}...` : note.title}`}</h1>
        <p className="font-light text-xxs flex-wrap leading-[-0.3px]">
          {`${note?.body?.length > 51 ? `${note?.body?.slice(0, 50)}...` : note?.body}`}
        </p>
      </div>

      {/* status added date and the latest date of update */}
      <div className="text-xxs font-medium flex justify-between pt-[7px]">
        <p>
          <span>Added: </span>
          <span>{dayjs(note?.createdAt)?.format("DD MMM YYYY")}</span>
        </p>
        {note?.updatedAt && (
          <p>
            <span>Edited: </span>
            <span>{dayjs(note?.updatedAt)?.format("DD MMM YYYY")}</span>
          </p>
        )}
      </div>
    </div>
  );
};
