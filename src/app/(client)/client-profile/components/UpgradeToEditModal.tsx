import { StarIcon } from "hexis/components/icons/general";
import React from "react";
import { INTEREST_FORM } from "hexis/constants/routenames";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const UpgradeToEditModal: React.FC<Props> = ({ show, setShow }) =>
  show && (
    <div className="z-50 fixed w-full h-full bg-black/80 flex justify-center items-center " onClick={() => setShow(false)}>
      <div className="inline-flex flex-col items-center">
        <div
          className="flex w-24 h-24 justify-center items-center gap-2.5 rounded-full bg-activeblue-100 border-4 border-background-800"
          style={{ transform: "translateY(50%)" }}
          onClick={e => e.stopPropagation()}
        >
          <StarIcon className="w-10 h-10 text-white" />
        </div>
        <div
          className="w-[400px] flex self-stretch pt-16 pb-6 px-6 flex-col justify-center items-center gap-6 rounded-2xl bg-background-900"
          onClick={e => e.stopPropagation()}
        >
          <span className="text-center text-lightgrey1-600 font-medium text-2xl tracking-[0.25px]">Pro & Premium Coming Soon</span>
          <span className="text-center text-lightgrey1-600 font-normal text-base tracking-[0.25px]">
            Register your interest to be the first to know about these new plans.
          </span>
          <a href={INTEREST_FORM} target="_blank">
            <button className="flex self-stretch py-3 px-6 justify-center items-center gap-2.5 flex-1 text-sm rounded-[10px] font-normal bg-activeblue-100 tracking-[0.7px] shadow-[0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 1px 3px 0px rgba(16, 24, 40, 0.20)] hover:bg-activeblue-100/70">
              Register Interest Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );

export default UpgradeToEditModal;
