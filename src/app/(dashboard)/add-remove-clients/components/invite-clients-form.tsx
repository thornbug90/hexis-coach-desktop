"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectField from "hexis/components/common/select-field";
import { refreshAllInvitations, sendInvitations } from "hexis/lib/graphql-client";
import { useAppDispatch } from "hexis/hooks/useRedux";
import { Button } from "hexis/components/common/button";
import { debounce } from "lodash";

interface IEmail {
  label: string;
  value: string;
}
interface IClientEmails {
  email: IEmail[];
}
const InviteClientsForm = ({
  availableSeats,
  totalNumberOfSeats,
  setModalToggle,
}: {
  availableSeats: number;
  totalNumberOfSeats: number;
  setModalToggle: Function;
}) => {
  const [enteredEmail, setEnteredEmail] = useState(false);
  const [inviteErrors, setInviteErrors] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [count, setCount] = useState(0);

  const { reset, control, handleSubmit, getValues, setValue } = useForm<IClientEmails>({
    mode: "onSubmit",
    defaultValues: { email: [] },
  });
  const dispatch = useAppDispatch();

  const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,100}$/i;

  const onSubmit = (values: IClientEmails) => {
    const filteredEmails = values?.email?.filter(email => email?.value?.match(emailFormat));

    if (filteredEmails?.length !== 0 && filteredEmails?.length <= totalNumberOfSeats - availableSeats) {
      const toSend = filteredEmails?.map((email: IEmail) => ({
        to: email?.value,
      }));
      setInviteErrors("");
      setSending(true);

      sendInvitations({
        input: toSend,
      }).then(({ invite }) => {
        setSending(false);
        refreshAllInvitations(dispatch);
        if (invite && invite?.errors?.length < 1) {
          setModalToggle(false);
        } else if (invite && invite?.errors?.length > 0) {
          setInviteErrors(invite?.errors.join("\n"));
          return;
        } else {
          setInviteErrors("Error: you can't send invitation now. Please try again later.");
          return;
        }
      });

      reset();
      setCount(filteredEmails?.length);
      setEnteredEmail(true);
      setTyping(false);
    } else {
      setCount(filteredEmails?.length);
      setEnteredEmail(false);
    }
  };

  useEffect(() => {
    setEnteredEmail(false);
  }, [availableSeats]);

  const handleChange = (e: any) => {
    if (e?.match(emailFormat)) {
      setTyping(true);
      return true;
    } else {
      return false;
    }
  };

  const handleLastEmail = debounce((e: any) => {
    const unHandledEmail = e.target.value;
    if (handleChange(unHandledEmail)) setValue("email", [...getValues("email"), { label: unHandledEmail, value: unHandledEmail }]);
  }, 200);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <SelectField name="email" control={control} placeholder="Client's email" isValidNewOption={handleChange} onBlur={handleLastEmail} />

        <div className="flex justify-center pb-3">
          <Button
            loading={sending}
            buttonType="submit"
            className={`modal-action ${
              totalNumberOfSeats - availableSeats >= count && !sending ? "bg-activeblue-100" : "bg-carbcodelow-600"
            } rounded-[9px] w-[190px] h-10 flex items-center justify-center font-normal text-sm ${typing ? "opacity-100" : "opacity-30"}`}
            text={totalNumberOfSeats - availableSeats >= count ? `Send ${count > 1 ? "invites" : "invite"}` : `Exceeded invite limit`}
          />
        </div>

        {enteredEmail && (
          <p className="text-error text-xs ">{!inviteErrors ? `You sent ${count} ${count > 1 ? "invites" : "invite"}` : inviteErrors}</p>
        )}
      </form>
    </div>
  );
};

export default InviteClientsForm;
