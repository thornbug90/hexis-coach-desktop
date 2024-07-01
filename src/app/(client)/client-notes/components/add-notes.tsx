"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SvgPlusIcon from "hexis/components/icons/general/PlusIcon";
import SvgBin from "hexis/components/icons/general/Bin";
import { InputField } from "hexis/components/common/input-field";
import TextArea from "hexis/components/common/textarea-field";
import LeftSideNewNote from "./left-new-note";
import { LeftSideNote } from "./left-note";
import RightSideViewNote from "./right-view-note";

import { addClientNote, getClientNotes } from "hexis/lib/graphql-client";
import { Coach_Note_Types, Note, NoteInput } from "hexis/generated/graphql";
import { setNotes, setSelectedNote } from "hexis/state/client-notes/slice";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "hexis/hooks/useRedux";

export interface INotesForm {
  title: string;
  subtitle: string;
  date: string;
}

export enum NOTES_STATUS {
  ADDED = "Added",
  EDITED = "Edited",
}

const NotesLayout = () => {
  const dispatch = useAppDispatch();

  const { selectedClient, user, notes, selectedNote } = useAppSelector(
    ({ user: { selectedClient, user }, clientNotes: { notes, selectedNote } }) => ({
      selectedClient,
      user,
      notes,
      selectedNote,
    }),
  );

  const clientNotes = notes?.filter(note => note.type === Coach_Note_Types.Client);

  useEffect(() => {
    setActiveNote(clientNotes[clientNotes.length - 1]);
    dispatch(setSelectedNote(clientNotes[clientNotes.length - 1]));
  }, [dispatch, notes]);

  const [addNote, setAddNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState("Add a title");
  const [noteSubtitle, setNoteSubtitle] = useState("Type client notes here");
  const [date, setDate] = useState("");
  const [clicked, setClicked] = useState(false);
  const [_, setActiveNote] = useState(clientNotes[clientNotes?.length - 1]);

  const { data } = useQuery({
    queryKey: ["getClientNotes", selectedClient?.id],
    queryFn: () =>
      getClientNotes({
        clientId: selectedClient?.id || "",
        coachId: user?.id || "",
      }),
    enabled: !!selectedClient?.id,
  });

  const { mutateAsync: createNote } = useMutation({
    mutationKey: ["createNewNote"],
    mutationFn: (newNode: NoteInput) => {
      return addClientNote({
        input: newNode,
      });
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(setNotes(data?.getCoachNotes));
    }

    return () => {
      dispatch(setNotes([]));
    };
  }, [data, dispatch]);

  const { reset, control, handleSubmit } = useForm<INotesForm>({
    mode: "onSubmit",
    defaultValues: { title: "", subtitle: "", date: "" },
  });

  const handleAddNote = () => {
    setAddNote(true);
    reset();
    setNoteTitle("Add a title");
    setNoteSubtitle("Type client notes here");
    setDate("");
    setClicked(false);
  };

  // this information will be used to display on the left side note in realtime
  const onSubmit = (values: INotesForm) => {
    const date = new Date();
    // TODO: read locale from users date/time zone set
    const timestamp = date.toLocaleDateString("en-uk", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    setNoteTitle(values?.title ? values?.title : "Add a title");
    setNoteSubtitle(values?.subtitle ? values?.subtitle : "Type client notes here");
    setDate(timestamp);
  };

  const handleDeleteNote = () => {
    setAddNote(false);
  };

  // this is the function to add the note
  const saveNewNote = async (e: React.MouseEvent) => {
    e.preventDefault();
    setClicked(true);

    try {
      const newNote: Omit<NoteInput, "id" | "createdAt"> = {
        title: noteTitle,
        body: noteSubtitle,
        clientId: selectedClient?.id || "",
        coachId: user?.id || "",
        dayNoteDay: null,
      };

      const response = await createNote(newNote);
      dispatch(setNotes([...notes, response.addClientNote]));
      setAddNote(false);
    } catch (error) {
      console.log({ error });
    }
  };

  // this sets the note to be showing as active
  const handleActiveNote = (note: Note) => {
    setActiveNote(note);
    dispatch(setSelectedNote(note));
  };

  return (
    <div className="">
      {/* header */}
      <div className="flex justify-between">
        <div className="flex items-center h-8">
          <p className="w-[92px] text-sm font-medium mr-2">All notes</p>
          <p onClick={handleAddNote} className="bg-activeblue-100 p-[10px] rounded-2xl">
            {" "}
            <SvgPlusIcon width={12} height={12} />{" "}
          </p>
        </div>

        <p className="text-base font-semibold">{`${selectedClient?.firstName} ${selectedClient?.lastName}`}</p>
      </div>

      <div className="py-5 h-full w-full flex justify-between gap-[20px]">
        {/* left side */}
        <div className="min-w-[334px] w-1/3 h-[87vh] overflow-y-auto mb-3">
          {addNote && <LeftSideNewNote noteTitle={noteTitle} noteSubtitle={noteSubtitle} date={date} />}

          {clientNotes?.length > 0 && (
            <div>
              {clientNotes
                ?.map(note => (
                  <div
                    key={note?.id}
                    className={`${
                      !addNote && selectedNote?.id === note?.id ? "bg-activeblue-100" : "bg-background-300"
                    } h-[91px] px-[38px] py-4 border-b-[1px] border-opacity-20 border-white ${
                      !addNote && note?.id === clientNotes?.[clientNotes.length - 1]?.id && "rounded-tl-lg"
                    }`}
                  >
                    <LeftSideNote note={note} onClick={_ => handleActiveNote(note)} />
                  </div>
                ))
                ?.reverse()}
            </div>
          )}

          {clientNotes?.length <= 0 && <div></div>}
        </div>

        {/* right side */}
        <div className="bg-background-700 min-w-[710px] w-2/3 h-[80vh] rounded-tr-[6px] overflow-y-auto">
          {addNote && (
            <form onChange={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
              <div className="px-[49px] py-6">
                <InputField
                  name="title"
                  placeholder="Add a title"
                  control={control}
                  className="text-[26px] bg-inherit outline-none w-full font-medium p-0 mb-[22px]"
                />

                <TextArea
                  name="subtitle"
                  control={control}
                  placeholder="Type client notes here..."
                  className="w-full text-sm font-normal h-80 bg-inherit outline-none resize-none"
                />

                {clicked && (
                  <p className="font-medium text-sm mt-14">
                    <span className="text-activeblue-100">{NOTES_STATUS.ADDED}:</span> {date}
                  </p>
                )}
              </div>

              <div>
                <div className="border-b-[0.82px] border-b-lightgrey1-700 border-opacity-20"></div>

                <div className="flex justify-between px-[49px] py-6">
                  <span onClick={handleDeleteNote}>
                    <SvgBin />
                  </span>

                  <button
                    onClick={e => saveNewNote(e)}
                    className={`bg-activeblue-100 font-medium text-sm leading-[0.15px] w-[131px] h-[29px] px-[9.5px] py-[4.7px] rounded-md ${
                      date ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          )}

          {!addNote && clientNotes?.length > 0 && <RightSideViewNote />}

          {!addNote && clientNotes?.length <= 0 && (
            <div className="h-full flex flex-col">
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-[30.93px] font-medium mb-[17px]">
                  <span>Welcome to </span>
                  <span className="text-activeblue-100">Notes</span>
                </h1>
                <p className="text-xl font-normal leading-[0.337px]">Hit the “+” button to add your first note</p>
              </div>
              <div className="w-full border-b-[0.82px] border-b-lightgrey1-700 border-opacity-20 mb-[77px]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesLayout;
