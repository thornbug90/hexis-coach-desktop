import React from "react";
import SvgBin from "@components/icons/general/Bin";
import { Button } from "@components/common/button";

const DeleteConfirmationModal = ({ onClick, loading }: { onClick: () => void; loading: boolean }) => {
  return (
    <div className="relative">
      {/* invite clients button */}
      <label htmlFor="my_modal_7" className="relative flex flex-row items-center  h-10">
        <SvgBin className="cursor-pointer" />
      </label>

      {/* The modal to invite clients */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-[510px] overflow-hidden backdrop-blur shadow-[0px 4px 6px -2px rgba(0, 0, 0, 0.5)] bg-background-500 border-[0.82px] border-gray-500 border-opacity-40 rounded-[7px]">
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
          <div className="flex justify-center">
            <div className="px-12">
              <h3 className="font-medium text-xl text-center">Delete Note</h3>
              <p className="text-center pt-4 pb-5 text-[13px] font-medium">You’re about to delete this client note. Are you sure?</p>
            </div>
          </div>

          <div className="flex flex-row w-full justify-between pt-5">
            <label
              className="text-sm w-[12rem] bg-background-300 rounded-mdtext-white  hover:bg-activeblue-200 p-3 rounded-lg font-semibold text-center"
              htmlFor="my_modal_7"
            >
              No, Keep it
            </label>

            <Button text="Yes, Delete" loading={loading} onClick={onClick} className={`font-medium text-sm w-[12rem] rounded-md`} />
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

        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
