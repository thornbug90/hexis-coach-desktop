"use client";

import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "hexis/hooks/useRedux";
import { deleteClientNote } from "hexis/lib/graphql-client";
import { setNotes } from "hexis/state/client-notes/slice";

const DeleteNoteContent = () => {
  const dispatch = useDispatch();

  const { notes, selectedNote } = useAppSelector(({ user: { selectedClient, user }, clientNotes: { notes, selectedNote } }) => ({
    selectedClient,
    user,
    notes,
    selectedNote,
  }));

  const { mutateAsync: deleteNote } = useMutation({
    mutationKey: ["deleteNote"],
    mutationFn: (noteId: string) => {
      return deleteClientNote({
        deleteNoteId: noteId,
      });
    },
  });

  const handleNoteDelete = async () => {
    try {
      if (selectedNote) {
        await deleteNote(selectedNote.id);
        dispatch(setNotes(notes.filter(note => note.id !== selectedNote.id)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="px-12 flex flex-col items-center justify-around">
      <h3 className="font-medium text-xl text-center pt-4 leading-[0.337px]">Delete Note</h3>
      <p className="text-center text-xs font-medium flex flex-col py-7">
        <span>You’re about to delete this client note.</span>
        <span>Are you sure?</span>
      </p>

      <div className="flex flex-row justify-between w-[400px] gap-5">
        <label
          htmlFor="my_modal_10"
          className="mt-0 pt-[11px] px-3 bg-background-300 rounded-[8.9089px] h-10 w-44 text-sm flex flex-row justify-center modal-action"
        >
          No, keep it
        </label>
        <label
          htmlFor="my_modal_10"
          className="mt-0 pt-[11px] px-3 bg-activeblue-100 rounded-[8.9089px] h-10 w-44 text-sm flex flex-row justify-center modal-action"
          style={{
            boxShadow: "0px 3.56356px 3.56356px rgba(0, 0, 0, 0.3)",
          }}
          onClick={handleNoteDelete}
        >
          Yes, delete it
        </label>
      </div>
    </div>
  );
};

export default DeleteNoteContent;
