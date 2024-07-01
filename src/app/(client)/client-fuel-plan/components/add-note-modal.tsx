import { Button } from "hexis/components/common/button";
import { InputField } from "hexis/components/common/input-field";
import { CloseIcon, InfoIcon } from "hexis/components/icons/general";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import { useMutation } from "@tanstack/react-query";
import { Coach_Note_Types, NoteInput } from "hexis/generated/graphql";
import { addClientNote } from "hexis/lib/graphql-client";
import { useAppSelector, useAppDispatch } from "hexis/hooks/useRedux";
import dayjs from "dayjs";
import { setNotes } from "hexis/state/client-notes/slice";
import clsx from "clsx";
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);

function AddNoteModal({ showModal, setModal, date }: { showModal: boolean; setModal: Function; date: string }) {
  const { user, selectedClient, notes } = useAppSelector(({ user: { selectedClient, user }, clientNotes: { notes } }) => ({
    user,
    selectedClient,
    notes,
  }));

  const dispatch = useAppDispatch();

  const { mutateAsync: createDayNote, isLoading } = useMutation({
    mutationKey: ["add-day-note"],
    mutationFn: (newNode: NoteInput) => {
      return addClientNote({ input: newNode });
    },
  });
  const [athleteNotification, setAthleteNotification] = useState<boolean>(false);

  const noteForm = {
    title: "title",
    body: "body",
    date: "date",
    time: "time",
  };

  interface INoteForm {
    title: string;
    body: string;
    date: string;
    time: string;
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<INoteForm>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      body: "",
      date: "",
      time: "",
    },
  });

  const addNote = async (values: INoteForm) => {
    try {
      let hour = values.time.split(":")[0] || "00";
      let min = values.time.split(":")[1] || "00";

      hour = hour.padStart(2, "0");
      min = min.padStart(2, "0");
      const dNoteDate = `${dayjs(date).format("YYYY-MM-DD")}T${hour}:${min}:00.000Z`;

      const dateObj = new Date(date);
      dateObj.setHours(Number(hour));
      dateObj.setMinutes(Number(min));

      const newNote: NoteInput = {
        title: values.title,
        body: values.body,
        dayNoteDay: new Date(`${dayjs(dNoteDate).utc().format("YYYY-MM-DDTHH:mm:ss.SSS")}Z`),
        type: Coach_Note_Types.Day,
        clientId: selectedClient?.id || "",
        coachId: user?.id || "",
        alertNotification: athleteNotification,
      };
      const response = await createDayNote(newNote);
      const newNotes = [...notes, response.addClientNote];
      dispatch(setNotes(newNotes));
      setModal(false);
      setAthleteNotification(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setAthleteNotification(false);
    reset();
    setModal(false);
  };

  const isNotificationToggleDisabled = dayjs().isAfter(dayjs(date), "day");

  const toggleNotification = () => {
    !isNotificationToggleDisabled && setAthleteNotification(prev => !prev);
  };

  return showModal ? (
    <div className="absolute z-10 h-full w-full bg-black/75 flex justify-center items-center">
      <div className="flex flex-col gap-6 bg-background-300 min-w-[500px] p-6 rounded-lg relative">
        <div className="absolute -right-3 -top-3">
          <div className="bg-background-500 p-3 rounded-full w-12 h-12 flex justify-center items-center absolute right-0">
            <div onClick={closeModal} className="bg-activeblue-100 p-3 rounded-full w-10 h-10 hover:cursor-pointer">
              <CloseIcon />
            </div>
          </div>
        </div>
        <p className="font-semibold text-lg">Add Note</p>
        <div className="flex flex-col gap-3">
          <div className="bg-background-900 rounded-lg w-full px-4 py-2">
            <label className="text-[10px] text-activeblue-100 tracking-widest font-semibold uppercase leading-4">Title</label>
            <InputField
              id={noteForm.title}
              name={noteForm.title}
              control={control}
              errors={errors.title?.message}
              className="h-6 w-full outline-0 bg-background-900 tracking-[0.15px] placeholder-white placeholder-opacity-50 text-left"
              placeholder="Add title"
              overrideClassName={true}
              inputStyle={{ minHeight: 20 }}
              rules={{ required: true }}
            />
          </div>

          <div className="bg-background-900 rounded-lg p-3 relative">
            <p className="text-xxs absolute text-activeblue-100 font-semibold">NOTE</p>
            <Controller
              name={noteForm.body as keyof typeof noteForm}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Add your note here"
                  className="bg-background-900 my-4 min-h-[100px] w-full outline-none font-normal resize-none placeholder-white placeholder-opacity-50"
                />
              )}
            />
            {errors.body && (
              <p className="text-red-600 text-xxs" role="alert">
                {errors.body.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="form-control w-2/5">
            <label className="cursor-pointer label">
              <span className="label-text text-white font-semibold">Athlete Notification</span>
              <input
                type="checkbox"
                disabled={isNotificationToggleDisabled}
                className={clsx(
                  "toggle [--tglbg:#4E4B66] bg-lightgrey1-700 border-0 checked:[--tglbg:#359CEF]",
                  isNotificationToggleDisabled && "disabled:opacity-100",
                )}
                onChange={toggleNotification}
                checked={athleteNotification}
              />
            </label>
          </div>
          <div className="bg-background-100 p-2 rounded-md flex justify-center items-center space-x-1">
            <InfoIcon />
            <p className="text-xs font-normal">This will send a push notification to the athletes phone at the scheduled time.</p>
          </div>
          {athleteNotification ? (
            <div className="flex justify-between gap-3">
              <div className="bg-background-400 rounded-md p-2 w-full">
                <p className="text-xxs absolute text-activeblue-100">DATE</p>
                <p className="mt-3">{dayjs(date).format("DD/MM/YYYY")}</p>
              </div>
              <div className="bg-background-400 rounded-md p-2 w-full">
                <p className="text-xxs absolute text-activeblue-100">TIME</p>
                <InputField
                  id={noteForm.time}
                  name={noteForm.time}
                  control={control}
                  type="time"
                  errors={errors.time?.message}
                  className="bg-background-400 w-full pt-3"
                  value="09:00 AM"
                  // rules={{ required: true }}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex justify-center">
          <Button
            loading={isLoading}
            onClick={handleSubmit(addNote)}
            disabled={!isValid}
            overrideClassName={true}
            text="Add note"
            className={`w-1/2 p-2 rounded-lg ${isValid ? "bg-activeblue-100 text-white" : "bg-[#33669d] text-[#fcfdff57]"}`}
          />
        </div>
      </div>
    </div>
  ) : null;
}

export default AddNoteModal;
