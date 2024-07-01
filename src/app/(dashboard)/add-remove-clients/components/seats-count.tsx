"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hexis/hooks/useRedux";
import { addMoreSeats, availableSeats, getAllActiveClients, getAllInvitations } from "hexis/lib/graphql-client";
import TabTitles from "./tab-titles";
import { useRouter } from "next/navigation";
import { AvailableSeatsQuery } from "hexis/generated/graphql";
import { useQuery } from "@tanstack/react-query";
import { seatsPlan } from "hexis/constants/clients";
import {
  saveActiveClients,
  saveInvitesPending,
  saveLeftSeatsToAddPendingClients,
  saveNumberOfAvailableSeats,
  saveTotalNumberOfSeats,
} from "hexis/state/clients/slice";

enum Invitation_Status {
  Canceled = "Canceled",
  Expired = "Expired",
  Pending = "Pending",
  Used = "Used",

  WAITING_FOR_RESPONSE = "Waiting for response",
}

const SeatsCount = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { activeClients, invitesPending, allAvailableSeats, totalNumberOfSeats, leftSeatsToAddPendingClients } = useAppSelector(
    ({ clients: { activeClients, invitesPending, allAvailableSeats, totalNumberOfSeats, leftSeatsToAddPendingClients } }) => ({
      activeClients,
      invitesPending,
      allAvailableSeats,
      totalNumberOfSeats,
      leftSeatsToAddPendingClients,
    }),
  );

  // seeing number of available seats on the plan selected
  const [seats, setSeats] = useState<AvailableSeatsQuery | undefined>();

  // coach plan seats
  const planAvailableSeats = useQuery({
    queryKey: ["availableSeats"],
    queryFn: () => availableSeats(),
  });
  // invites that have been sent
  const invites = useQuery({
    queryKey: ["getAllInvitations"],
    queryFn: () => getAllInvitations(),
  });
  // clients that accepted the invites
  const allActiveClients = useQuery({
    queryKey: ["getAllActiveClients"],
    queryFn: () => getAllActiveClients(),
  });

  useEffect(() => {
    setSeats(planAvailableSeats?.data);
  }, [planAvailableSeats?.data]);

  useEffect(() => {
    dispatch(saveInvitesPending(invites?.data));
  }, [dispatch, invites?.data]);

  useEffect(() => {
    dispatch(saveActiveClients(allActiveClients?.data));
  }, [allActiveClients?.data, dispatch]);

  useEffect(() => {
    const filteredInvites = invitesPending?.listInvitations?.filter(invite => invite?.status === Invitation_Status.Pending?.toUpperCase());
    const totalPlanSeats = (activeClients?.getMyChildren?.length || 0) + (filteredInvites?.length || 0);
    dispatch(saveNumberOfAvailableSeats(totalPlanSeats));

    const seatsAvailableForTheCoach = seats?.getMyEntitlements?.find(plan => plan?.id === seatsPlan);
    const seatsAvailable = seatsAvailableForTheCoach?.value || 0;
    dispatch(saveTotalNumberOfSeats(seatsAvailable));

    const seatsLeft = seatsAvailable - totalPlanSeats;
    dispatch(saveLeftSeatsToAddPendingClients(seatsLeft));
  }, [seats, invitesPending, activeClients, dispatch]);

  const handleAddMoreSeats = async () => {
    const add = await addMoreSeats();
    router.push(add.createBillingPortalLink);
  };

  return (
    <>
      <div className="flex flex-row justify-between w-full pt-10 pb-3">
        {/* available seats */}
        <div>
          <div className="text-sm flex flex-row items-center">
            <p className="font-medium pr-1">Seats: </p>
            <p className="font-semibold">
              <span>{allAvailableSeats}</span>
              <span className="px-0.5">/</span>
              <span>{totalNumberOfSeats}</span>
            </p>

            {totalNumberOfSeats > 0 && leftSeatsToAddPendingClients === 0 && (
              <p className="ml-2 rounded-full bg-carbcodelow-600 w-[10px] h-[10px]"></p>
            )}
          </div>
        </div>

        <button className="text-sm font-normal text-activeblue-100 underline hover:cursor-pointer" onClick={handleAddMoreSeats}>
          Add more seats
        </button>
      </div>

      <hr className="opacity-70 border-[0.68px]" />

      {totalNumberOfSeats === 0 && (
        <div className="text-sm font-medium mt-3">
          <p>You currently have no seats in your membership plan.</p>
          <p>Select “Add more seats” or you can manage your membership from the Account page.</p>
        </div>
      )}

      <TabTitles />
    </>
  );
};

export default SeatsCount;
