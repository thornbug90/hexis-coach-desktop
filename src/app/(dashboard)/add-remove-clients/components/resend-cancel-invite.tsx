"use client";

import React, { useState } from "react";
import SvgPaperPlane from "hexis/components/icons/general/PaperPlane";
import SvgCancelIconWithCircle from "hexis/components/icons/general/CancelIconWithCircle";
import { cancelInvitation, refreshAllInvitations, resendInvitation } from "hexis/lib/graphql-client";
import { GetAllInvitationsQuery } from "hexis/generated/graphql";
import { useAppDispatch, useAppSelector } from "hexis/hooks/useRedux";

interface IProps {
  currentData: GetAllInvitationsQuery["listInvitations"][0] | null;
}

const ResendOrCancelInvite = ({ currentData }: IProps) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usedUpSeats, setUsedUpSeats] = useState("");
  const dispatch = useAppDispatch();

  const { allAvailableSeats, totalNumberOfSeats } = useAppSelector(({ clients: { totalNumberOfSeats, allAvailableSeats } }) => ({
    allAvailableSeats,
    totalNumberOfSeats,
  }));

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleResendInvite = (id: string | undefined) => {
    setLoading(true);
    resendInvitation({
      invitationId: id as string,
    }).then(() => {
      refreshAllInvitations(dispatch);
      setLoading(false);
    });
    handleClick();
  };
  const handleCancelInvite = (id: string | undefined) => {
    setLoading(true);
    cancelInvitation({
      invitationId: id as string,
    }).then(() => {
      refreshAllInvitations(dispatch);
      setLoading(false);
    });
    handleClick();
  };

  return (
    <div>
      <div className="relative">
        <div className="flex justify-end font-bold tracking-widest" onClick={handleClick}>
          {loading ? (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-3 h-3 mt-6 text-white animate-spin"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="primary-content"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            `...`
          )}
        </div>
        {visible && (
          <div className="absolute h-[124px] w-72 border-[0.82px] border-opacity-40 border-gray-500 -right-4 top-[50px] rounded-[7px] flex flex-col justify-around bg-background-600 z-[1] shadow-[0px 4px 6px -2px rgba(0, 0, 0, 0.5), 0px 12px 16px -4px rgba(0, 0, 0, 0.5)]">
            <div className="relative">
              {/* invite clients modal */}
              <label htmlFor="my_modal_2" className="px-7 flex flex-row items-center gap-[18px] font-medium text-[15.79px]">
                <span>
                  {" "}
                  <SvgPaperPlane />{" "}
                </span>
                <span className="">Resend Invitation</span>
              </label>

              {/* The modal to invite clients */}
              <input type="checkbox" id="my_modal_2" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box w-[511px] h-[255px] overflow-hidden backdrop-blur shadow-[0px 4px 6px -2px rgba(0, 0, 0, 0.5)] bg-background-500 border-[0.82px] border-gray-500 border-opacity-40 rounded-[7px] p-0">
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
                  <div className="px-7 flex flex-col items-center">
                    <h3 className="font-medium text-xl text-center pt-[7px]">Resend invitation?</h3>

                    <div className="h-[83px] text-center pb-5 text-[13px] font-medium leading-loose">
                      <p className="font-medium">You’re about to resend an invitation to: </p>
                      <p className="font-bold text-sm">{currentData?.to} </p>
                      <p className="font-medium">Are you sure?</p>
                    </div>

                    {/* modal buttons */}
                    <div className="grid grid-cols-2 gap-[30px] h-10 pt-[25px]">
                      <label
                        className="mt-0 px-3 bg-background-300 rounded-[8.9089px] h-10 w-44 text-sm flex flex-row justify-center items-center modal-action"
                        htmlFor="my_modal_2"
                        onClick={handleClick}
                      >
                        No
                      </label>
                      <label
                        className="px-3 bg-activeblue-100 rounded-[8.9089px] h-10 w-44 text-sm flex flex-row justify-center items-center"
                        style={{
                          boxShadow: "0px 3.56356px 3.56356px rgba(0, 0, 0, 0.3)",
                        }}
                        onClick={() => {
                          totalNumberOfSeats - allAvailableSeats !== 0
                            ? handleResendInvite(currentData?.id)
                            : setUsedUpSeats("You have no more seats available");
                        }}
                      >
                        Yes
                      </label>
                    </div>
                    <p className="text-xs text-center text-error pt-1">{usedUpSeats}</p>
                  </div>

                  {/* gradient bottom highlight */}
                  <div
                    className="absolute -left-20 -bottom-[400px] w-[727.45px] h-[543.94px]"
                    style={{
                      background: "radial-gradient(50% 50% at 50% 50%, rgba(43, 217, 255, 0.2) 0%, rgba(46, 142, 255, 0) 100%)",
                      transform: "rotate(90deg)",
                      zIndex: -10,
                    }}
                  ></div>
                </div>

                <label className="modal-backdrop" htmlFor="my_modal_2">
                  Close
                </label>
              </div>
            </div>

            <hr className="border-lightgrey2-600 opacity-20" />

            <div className="relative">
              {/* invite clients modal */}
              <label htmlFor="my_modal_1" className="px-7 flex flex-row items-center gap-[18px] font-medium text-[15.79px]">
                <span>
                  {" "}
                  <SvgCancelIconWithCircle />{" "}
                </span>
                <span className="">Cancel Invitation</span>
              </label>

              {/* The modal to invite clients */}
              <input type="checkbox" id="my_modal_1" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box w-[511px] h-[255px] overflow-hidden backdrop-blur shadow-[0px 4px 6px -2px rgba(0, 0, 0, 0.5)] bg-background-500 border-[0.82px] border-gray-500 border-opacity-40 rounded-[7px] p-0">
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
                  <div className="px-7 flex flex-col items-center">
                    <h3 className="font-medium text-xl text-center pt-[7px]">Cancel invitation?</h3>

                    <div className="h-[83px] text-center pb-5 text-[13px] font-medium leading-loose">
                      <p className="font-medium">You’re about to cancel this invitation to: </p>
                      <p className="font-bold text-sm">{currentData?.to} </p>
                      <p className="font-medium">Are you sure?</p>
                    </div>

                    {/* modal buttons */}
                    <div className="grid grid-cols-2 gap-[30px] h-10 pt-[25px]">
                      <label
                        className="mt-0 px-3 bg-background-300 rounded-[8.9089px] h-10 w-44 text-sm flex flex-row justify-center items-center modal-action"
                        htmlFor="my_modal_1"
                        onClick={handleClick}
                      >
                        No
                      </label>
                      <label
                        className="px-3 bg-activeblue-100 rounded-[8.9089px] h-10 w-44 text-sm flex flex-row justify-center items-center"
                        style={{
                          boxShadow: "0px 3.56356px 3.56356px rgba(0, 0, 0, 0.3)",
                        }}
                        onClick={() => handleCancelInvite(currentData?.id)}
                      >
                        Yes
                      </label>
                    </div>
                  </div>

                  {/* gradient bottom highlight */}
                  <div
                    className="absolute -left-20 -bottom-[400px] w-[727.45px] h-[543.94px]"
                    style={{
                      background: "radial-gradient(50% 50% at 50% 50%, rgba(43, 217, 255, 0.2) 0%, rgba(46, 142, 255, 0) 100%)",
                      transform: "rotate(90deg)",
                      zIndex: -10,
                    }}
                  ></div>
                </div>

                <label className="modal-backdrop" htmlFor="my_modal_1">
                  Close
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResendOrCancelInvite;
