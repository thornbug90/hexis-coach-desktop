"use client";
import DropdownMenu from "./dropdown";
import { useDispatch } from "react-redux";
import DebouncedSearch from "./debounced-search";
import { useAppSelector } from "hexis/hooks/useRedux";
import { MenuIcon } from "../icons/general";
import { showSidebar } from "hexis/state/global/slice";

type Props = {
  active: boolean;
  sports?: string[];
};

export default function AllClientsHeader({ active, sports }: Props) {
  const dispatch = useDispatch();

  const { user } = useAppSelector(({ user: { user } }) => ({ user }));

  return (
    <div className="flex flex-col relative px-8 mt-10 mb-3 lg:mt-0 lg:flex-row justify-between lg:items-center w-full lg:pt-12 lg:mb-2">
      <div className="absolute top-1 right-5 lg:hidden" onClick={() => dispatch(showSidebar())}>
        <MenuIcon />
      </div>
      <div className="flex flex-col mb-6 lg:mb-0">
        <p className=" text-xl">
          <span className=" font-medium">
            {user?.firstName} {user?.lastName}
          </span>{" "}
          | <span className=" font-light">Coach Hub</span>
        </p>
        {active && <div className="text-gray-400 text-sm font-normal">Welcome back. Let&apos;s get to work</div>}
      </div>
      <div className="flex flex-row justify-between lg:justify-end lg:gap-2 w-full lg:w-auto lg:mr-3">
        <div className="flex flex-col gap-2 w-full md:flex-row md:w-calc justify-between lg:items-center">
          <DebouncedSearch active={active} />
          <DropdownMenu active={active} clientSports={sports} />
        </div>
      </div>
    </div>
  );
}
