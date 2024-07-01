"use client";

import React, { useState } from "react";
import { refreshAllClients, removeClient } from "hexis/lib/graphql-client";
import { GetAllActiveClientsQuery } from "hexis/generated/graphql";
import { useAppDispatch } from "hexis/hooks/useRedux";

interface IProps {
  currentData?: GetAllActiveClientsQuery["getMyChildren"][0];
}

const RemoveClient = ({ currentData }: IProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleClientRemoval = () => {
    setLoading(true);
    removeClient({ childId: currentData?.id }).then(() => {
      refreshAllClients(dispatch);
      setLoading(false);
    });
  };

  return (
    <div className="relative">
      {/* invite clients modal */}
      <label htmlFor={`my_modal_3_${currentData?.id}`} className="underline opacity-70 text-[11px] pr-[10px] font-medium">
        {loading ? `Removing the client...` : `Remove client`}
      </label>

      {/* The modal to invite clients */}
      <input type="checkbox" id={`my_modal_3_${currentData?.id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-[511px] h-[299px] overflow-hidden backdrop-blur shadow-[0px 4px 6px -2px rgba(0, 0, 0, 0.5)] bg-background-500 border-[0.82px] border-gray-500 border-opacity-40 rounded-[7px] p-0">
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
          <div className="px-7 flex flex-col items-center justify-around">
            <h3 className="font-medium text-xl text-center pt-[8px]">Remove Client?</h3>

            <div className="h-[106px] text-center pt-2 mb-4 text-[13px] font-medium leading-loose">
              <p className="font-medium">You’re about to remove the user: </p>
              <p className="font-bold">{currentData?.email} </p>
              <p className="font-medium">If you cancel you will no longer have access to this client’s data.</p>
              <p className="font-medium">Are you sure?</p>
            </div>

            {/* modal buttons */}
            <div className="grid grid-cols-2 gap-[30px] h-10 pt-[25px]">
              <label
                className="mt-0 px-3 bg-background-300 rounded-[8.9089px] h-10 w-44 text-sm flex flex-row justify-center items-center modal-action"
                htmlFor={`my_modal_3_${currentData?.id}`}
              >
                No
              </label>
              <label
                onClick={handleClientRemoval}
                className="mt-0 px-3 bg-activeblue-100 rounded-[8.9089px] h-10 w-44 text-sm flex flex-row justify-center items-center modal-action"
                htmlFor={`my_modal_3_${currentData?.id}`}
                style={{
                  boxShadow: "0px 3.56356px 3.56356px rgba(0, 0, 0, 0.3)",
                }}
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

        <label className="modal-backdrop" htmlFor={`my_modal_3_${currentData?.id}`}>
          Close
        </label>
      </div>
    </div>
  );
};

export default RemoveClient;
