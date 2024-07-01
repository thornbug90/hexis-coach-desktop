"use client";

import InviteClientsForm from "./invite-clients-form";
import Link from "next/link";
import { useAppSelector } from "hexis/hooks/useRedux";
export type modalProp = {
  setModalToggle: Function;
};
const ModalContent = ({ setModalToggle }: modalProp) => {
  const { allAvailableSeats, totalNumberOfSeats } = useAppSelector(({ clients: { totalNumberOfSeats, allAvailableSeats } }) => ({
    allAvailableSeats,
    totalNumberOfSeats,
  }));

  return (
    <div>
      {totalNumberOfSeats - allAvailableSeats !== 0 ? (
        <div className="flex justify-center">
          <div className="px-12">
            <h3 className="font-medium text-xl text-center">Invite New Client</h3>
            <p className="text-center pt-4 pb-5 text-[13px] font-medium">Send an invite directly to your new client’s email.</p>
            <p className="opacity-70 text-xs pb-4 font-light">Insert client email and press enter to add additional emails</p>

            <InviteClientsForm availableSeats={allAvailableSeats} totalNumberOfSeats={totalNumberOfSeats} setModalToggle={setModalToggle} />
          </div>
        </div>
      ) : (
        <div className="px-12 flex flex-col items-center justify-around">
          <h3 className="font-medium text-xl text-center h-11">No seats remaining</h3>
          <p className="h-[52px] text-center py-4 text-[13px] font-medium">
            You cannot send invitations until you add more seats to your plan. Add more seats from your Account page.
          </p>

          <div className="grid grid-cols-2 gap-[30px] h-10 pt-[25px] mt-4 pb-14">
            <label
              className="mt-0 pt-[11px] px-3 bg-background-300 rounded-[8.9089px] h-10 w-44 text-sm flex flex-row justify-center modal-action"
              htmlFor="my_modal_7"
            >
              Cancel
            </label>
            <label
              className="pt-[11px] px-3 bg-activeblue-100 rounded-[8.9089px] h-10 w-44 text-sm text-center"
              style={{
                boxShadow: "0px 3.56356px 3.56356px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Link
                rel="noopener noreferrer"
                href={`${process.env.NEXT_PUBLIC_HEXIS_WEB_URL || "https://dev-hexis-web-app.onrender.com"}/dashboard?referer=desktop`}
              >
                Go to Account
              </Link>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalContent;
