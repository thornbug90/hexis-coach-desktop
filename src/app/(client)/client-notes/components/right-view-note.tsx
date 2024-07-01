"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { InputField } from "hexis/components/common/input-field";
import TextArea from "hexis/components/common/textarea-field";
import { Coach_Note_Types, Note, NoteUpdateInput } from "hexis/generated/graphql";
import { useMutation } from "@tanstack/react-query";
import { updateClientNote } from "hexis/lib/graphql-client";
import { useAppSelector } from "hexis/hooks/useRedux";
import { setNotes } from "hexis/state/client-notes/slice";
import DeleteNote from "./delete-note-modal";

interface INotesForm {
  editedTitle: string;
  editedSubtitle: string;
  editedDate: string;
}

const RightSideViewNote = () => {
  const dispatch = useDispatch();

  const { notes, selectedNote } = useAppSelector(({ user: { selectedClient, user }, clientNotes: { notes, selectedNote } }) => ({
    selectedClient,
    user,
    notes,
    selectedNote,
  }));

  const clientNotes = notes?.filter(note => note.type === Coach_Note_Types.Client);

  const [noteTitle, setNoteTitle] = useState(selectedNote?.title);
  const [noteSubtitle, setNoteSubtitle] = useState(selectedNote?.body);
  const [date, setDate] = useState("");

  const { reset, control, handleSubmit, setValue } = useForm<INotesForm>({
    mode: "onChange",
    defaultValues: {
      editedTitle: selectedNote?.title,
      editedSubtitle: selectedNote?.body,
      editedDate: "",
    },
  });

  const { mutateAsync: updateNote } = useMutation({
    mutationKey: ["updateNote"],
    mutationFn: (updatedNote: NoteUpdateInput) => {
      return updateClientNote({
        input: updatedNote,
      });
    },
  });

  useEffect(() => {
    setValue("editedTitle", selectedNote?.title || "");
    setValue("editedSubtitle", selectedNote?.body || "");
  }, [selectedNote, setValue]);

  const onSubmit = (values: INotesForm) => {
    const date = new Date();
    // TODO: read locale from users date/time zone set
    const timestamp = date?.toLocaleDateString("en-uk", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    setNoteTitle(values?.editedTitle);
    setNoteSubtitle(values?.editedSubtitle);
    setDate(timestamp);
  };

  const saveEditedNote = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (date !== "") {
      try {
        const updatedNote: NoteUpdateInput = {
          id: selectedNote?.id || "",
          title: noteTitle || "",
          body: noteSubtitle || "",
          clientId: selectedNote?.clientId || "",
          coachId: selectedNote?.coachId || "",
          createdAt: selectedNote?.createdAt,
        };

        const { updateClientNote } = await updateNote(updatedNote);

        // Update the note on redux
        dispatch(
          setNotes(
            clientNotes?.map((note: Note) => {
              if (note?.id === updateClientNote?.id) {
                return updateClientNote;
              }

              return note;
            }),
          ),
        );

        reset();
        setDate("");
      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <div className=" flex flex-col justify-between h-full">
      <form onChange={handleSubmit(onSubmit)}>
        <div className="px-[49px] py-6">
          <InputField name="editedTitle" control={control} className="text-[26px] bg-inherit outline-none w-full font-medium" />
          <TextArea
            name="editedSubtitle"
            control={control}
            className="w-full text-sm font-normal h-80 bg-inherit outline-none resize-none"
          />
          <div className="h-14 overflow-y-auto">
            {selectedNote?.createdAt && (
              <p className="font-medium text-sm bg-inherit h-7">
                {" "}
                <span className="text-activeblue-100">Added:</span> {dayjs(selectedNote?.createdAt)?.format("DD MMM YYYY")}
              </p>
            )}

            {selectedNote?.updatedAt && (
              <p className="font-medium text-sm">
                <span className="text-activeblue-100">Edited:</span> {dayjs(selectedNote?.updatedAt)?.format("DD MMM YYYY")}
              </p>
            )}
          </div>
        </div>
      </form>

      <div className="flex  justify-between px-[49px] py-6 border-t-[0.82px] border-t-lightgrey1-700 border-opacity-20">
        <DeleteNote />
        <button
          onClick={e => saveEditedNote(e)}
          className={`bg-activeblue-100 font-medium text-sm leading-[0.15px] w-[131px] h-[29px] px-[9.5px] py-[4.7px] rounded-md ${
            date ? "opacity-100" : "opacity-60"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RightSideViewNote;
