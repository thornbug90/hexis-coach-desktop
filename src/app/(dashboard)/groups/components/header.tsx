"use client";

import React from "react";
import { useAppSelector } from "hexis/hooks/useRedux";
import AddGroupModal from "./add-group-modal";

const Header = () => {
  const { user } = useAppSelector(({ user: { user } }) => ({ user }));

  return (
    <div className="flex flex-col relative mt-10 mb-3 lg:mt-0 lg:flex-row justify-between lg:items-center w-full lg:pt-12 lg:mb-4">
      <div className="flex flex-col mb-6 lg:mb-0">
        <h1 className="text-xl tracking-wider font-medium">
          <span>
            {user?.firstName} {user?.lastName}
          </span>{" "}
          | <span>Coach Hub</span>
        </h1>

        <p className="text-gray-400 text-sm font-normal">Welcome back. Let&apos;s get to work</p>
      </div>

      <div className="flex items-center gap-6">
        <AddGroupModal />
      </div>
    </div>
  );
};

export default Header;
