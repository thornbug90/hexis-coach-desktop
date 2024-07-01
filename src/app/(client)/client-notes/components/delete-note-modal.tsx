"use client";

import React, { useState } from "react";
import SvgBin from "hexis/components/icons/general/Bin";

import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "hexis/hooks/useRedux";
import { deleteClientNote } from "hexis/lib/graphql-client";
import { setNotes } from "hexis/state/client-notes/slice";

const DeleteNote = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleModal = () => {
    setVisible(true);
  };

  const handleNoteDelete = async () => {
    try {
      setLoading(true);
      if (selectedNote) {
        await deleteNote(selectedNote.id);
        setVisible(false);
        dispatch(setNotes(notes.filter(note => note.id !== selectedNote.id)));
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="relative">
      {/* invite clients modal */}
      <label htmlFor="my_modal_10" onClick={handleModal}>
        <span>
          <SvgBin fillOpacity="1" />
        </span>
      </label>

      <input type="checkbox" id="my_modal_10" className="modal-toggle" />
      {visible && (
        <>
          <div className="modal">
            <div className="modal-box w-[511px] h-[216px] overflow-hidden backdrop-blur shadow-[0px 4px 6px -2px rgba(0, 0, 0, 0.5)] bg-background-500 border-[0.82px] border-gray-500 border-opacity-40 rounded-[7px]">
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
              {/* <DeleteNoteContent /> */}
              <div className="px-12 flex flex-col items-center justify-around">
                <h3 className="font-medium text-xl text-center pt-4 leading-[0.337px]">Delete Note</h3>
                <p className="text-center text-xs font-medium flex flex-col py-7">
                  <span>You&apos;re about to delete this client note.</span>
                  <span>Are you sure?</span>
                </p>

                <div className="flex flex-row justify-between w-[400px] gap-5">
                  <label
                    onClick={_ => setVisible(false)}
                    htmlFor="my_modal_10"
                    className="mt-0 pt-[11px] px-3 bg-background-300 rounded-[8.9089px] h-10 w-44 text-sm flex flex-row justify-center modal-action"
                  >
                    No, keep it
                  </label>

                  <button disabled={loading}>
                    <label
                      htmlFor="my_modal_10"
                      className={`mt-0 pt-[11px] px-3 bg-activeblue-100 rounded-[8.9089px] h-10 w-44 text-sm flex flex-row justify-center modal-action ${
                        loading ? "opacity-30" : "opacity-100"
                      } `}
                      style={{
                        boxShadow: "0px 3.56356px 3.56356px rgba(0, 0, 0, 0.3)",
                      }}
                      onClick={handleNoteDelete}
                    >
                      Yes, delete it
                    </label>
                  </button>
                </div>
              </div>

              {/* gradient bottom highlight */}
              <div
                className="absolute -left-20 -bottom-[350px] w-[727.45px] h-[543.94px] opacity-70"
                style={{
                  background: "radial-gradient(50% 50% at 50% 50%, rgba(43, 217, 255, 0.2) 0%, rgba(46, 142, 255, 0) 100%)",
                  transform: "rotate(90deg)",
                  zIndex: -10,
                }}
              ></div>
            </div>

            <label className="modal-backdrop" htmlFor="my_modal_10">
              Close
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteNote;
