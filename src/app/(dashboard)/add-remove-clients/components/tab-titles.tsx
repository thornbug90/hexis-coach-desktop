"use client";

import React, { useState } from "react";
import InvitationsPending from "./invitations-pending";
import ActiveClients from "./active-clients";
import clsx from "clsx";

const TabTitles = () => {
  const [invitationsPending, setInvitationsPending] = useState(true);
  const [activeClients, setActiveClients] = useState(false);

  const handleInvitationsPending = () => {
    setInvitationsPending(true);
    setActiveClients(false);
  };

  const handleActiveClients = () => {
    setInvitationsPending(false);
    setActiveClients(true);
  };

  return (
    <div className="pt-10 h-full">
      {/* tab titles */}
      <div className="w-[458px] grid grid-cols-2">
        <p
          className={clsx(
            invitationsPending && "opacity-100 text-sm font-semibold cursor-pointer",
            !invitationsPending && "font-normal text-sm opacity-70 cursor-pointer",
          )}
          onClick={handleInvitationsPending}
        >
          Invitations Pending
        </p>

        <p
          className={clsx(
            activeClients && "opacity-100 font-semibold text-sm cursor-pointer",
            !activeClients && "font-normal text-sm opacity-70 cursor-pointer",
          )}
          onClick={handleActiveClients}
        >
          Active Clients
        </p>
      </div>

      {/* screens to show */}
      <div className="py-10 h-full">
        {invitationsPending && <InvitationsPending />}
        {activeClients && <ActiveClients />}
      </div>
    </div>
  );
};

export default TabTitles;
