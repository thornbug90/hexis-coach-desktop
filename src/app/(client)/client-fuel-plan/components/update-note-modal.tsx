import { Button } from "hexis/components/common/button";
import { InputField } from "hexis/components/common/input-field";
import { CloseIcon } from "hexis/components/icons/general";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";

import { useMutation } from "@tanstack/react-query";
import { NoteUpdateInput } from "hexis/generated/graphql";
import { deleteClientNote, updateClientNote } from "hexis/lib/graphql-client";
import { useAppDispatch, useAppSelector } from "hexis/hooks/useRedux";
import TrashIcon from "hexis/components/icons/general/TrashIcon";
import TimerIcon from "hexis/components/icons/general/TimerIcon";
import OutlinedCalendarIcon from "hexis/components/icons/general/OutlinedCalendarIcon";
import { setNotes } from "hexis/state/client-notes/slice";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
dayjs.extend(advancedFormat);

function UpdateNoteModal({
  showModal,
  setModal,
  content,
}: {
  showModal: boolean;
  setModal: Function;
  content: {
    id: string;
    title: string;
    body: string;
    dayNoteDay: string;
    utcOffset: number;
    alertNotification: boolean;
  };
}) {
  const { notes } = useAppSelector(({ clientNotes: { notes } }) => ({ notes }));
  const dispatch = useAppDispatch();
  const { mutateAsync: updateDayNote, isLoading } = useMutation({
    mutationKey: ["update-day-note"],
    mutationFn: (newNode: NoteUpdateInput) => {
      return updateClientNote({ input: newNode });
    },
  });

  const { mutateAsync: deleteDayNote, isLoading: deleteLoading } = useMutation({
    mutationKey: ["update-day-note"],
    mutationFn: (noteId: string) => {
      return deleteClientNote({
        deleteNoteId: noteId,
      });
    },
  });

  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  const noteForm = {
    id: "id",
    title: "title",
    body: "body",
    dayNoteDay: "dayNoteDay",
  };

  interface INoteForm {
    id?: string;
    title?: string;
    body?: string;
    dayNoteDay?: string;
    utcOffset?: number;
    alertNotification?: boolean;
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INoteForm>({
    mode: "onSubmit",
    defaultValues: {
      id: content.id,
      title: content.title,
      body: content.body,
      dayNoteDay: content.dayNoteDay,
      utcOffset: content.utcOffset,
      alertNotification: content.alertNotification,
    },
  });

  useEffect(() => reset(content), [content]);

  const { handleSubmit: handleDelete } = useForm<INoteForm>({
    mode: "onSubmit",
    defaultValues: {
      id: content.id,
    },
  });

  const deleteNote = async () => {
    try {
      await deleteDayNote(content.id);
      const remainingNotes = notes.filter(note => note.id !== content.id);
      dispatch(setNotes(remainingNotes));
      setModal(false);
      setDeleteMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (values: INoteForm) => {
    try {
      const newNote: NoteUpdateInput = {
        id: content.id,
        title: values.title,
        body: values.body,
      };
      const replacedNote = notes.filter(note => note.id !== content.id);

      const response = await updateDayNote(newNote);
      const newNotes = [...replacedNote, response.updateClientNote];
      dispatch(setNotes(newNotes));
      setModal(false);
      setDeleteMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return showModal ? (
    <div className="absolute z-10 h-full w-full bg-black/75 flex justify-center items-center">
      <div className="flex flex-col bg-background-300 min-w-[500px] p-4 rounded-lg relative">
        <div className="absolute -right-3 -top-3">
          <div className="bg-background-500 p-3 rounded-full w-12 h-12 flex justify-center items-center absolute right-0">
            <div
              onClick={() => {
                setModal(false);
                setDeleteMode(false);
              }}
              className="bg-activeblue-100 p-3 rounded-full w-10 h-10 hover:cursor-pointer"
            >
              <CloseIcon />
            </div>
          </div>
        </div>
        <p className="py-2 font-semibold text-lg">Edit Note</p>
        <div className="bg-background-900 rounded-md mb-2 p-2 relative">
          <p className="text-xxs absolute text-activeblue-100 font-semibold">TITLE</p>
          <InputField
            id={noteForm.title}
            name={noteForm.title}
            control={control}
            errors={errors.title?.message}
            className="bg-background-900 mt-1 font-normal w-full"
            placeholder="Add title"
            rules={{ required: true }}
          />
        </div>

        <div className="bg-background-900 rounded-md mb-2 p-2 relative">
          <p className="text-xxs absolute text-activeblue-100 font-semibold">NOTE</p>
          <Controller
            name={noteForm.body as keyof typeof noteForm}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Add your note here"
                className="bg-background-900 my-4 rounded-md min-h-[100px] w-full outline-none font-normal"
              />
            )}
          />
          {errors.body && (
            <p className="text-red-600 text-xxs" role="alert">
              {errors.body.message}
            </p>
          )}
        </div>

        <div className="bg-lightgrey2-700 p-2 my-3 rounded-md flex justify-between">
          <p className="font-semibold">Athlete Notification</p>
          {content.alertNotification ? (
            <span className="flex space-x-3">
              <span className="flex items-center space-x-2">
                <OutlinedCalendarIcon />
                <p className="font-normal text-sm">{dayjs(content.dayNoteDay).utc().format("ddd Do MMM")}</p>
              </span>
              <span className="flex items-center space-x-2">
                <TimerIcon />
                <p className="font-normal text-sm"> {dayjs(content.dayNoteDay).utc().format("h:mm A")}</p>
              </span>
            </span>
          ) : (
            <span className="flex space-x-3">No Notification</span>
          )}
        </div>

        {!deleteMode ? (
          <div className="flex flex-row justify-center my-4 space-x-3">
            <Button
              onClick={() => setDeleteMode(true)}
              overrideClassName={true}
              className="w-10 h-10 p-2 bg-carbcodelow-600 rounded-lg"
              icon={<TrashIcon />}
            />
            <Button
              loading={isLoading}
              onClick={handleSubmit(updateNote)}
              overrideClassName={true}
              text="Save Note"
              className="w-1/2 p-2 bg-activeblue-100 rounded-lg"
            />
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center my-4 space-x-3">
            <p className="font-semibold text-sm">Are you sure you want to remove this note?</p>
            <Button
              loading={deleteLoading}
              onClick={handleDelete(deleteNote)}
              overrideClassName={true}
              className="w-20 p-2 rounded-lg bg-activeblue-100"
              text="Yes"
            />
            <Button
              onClick={() => setDeleteMode(false)}
              text="No"
              overrideClassName={true}
              variant="secondary"
              border={true}
              className="w-20 p-2 rounded-lg bg-background-200 hover:bg-background-500 border border-activeblue-100"
            />
          </div>
        )}
      </div>
    </div>
  ) : null;
}

export default UpdateNoteModal;
