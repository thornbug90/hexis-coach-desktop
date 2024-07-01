import React from "react";
import SeatsCount from "./components/seats-count";
import InviteClientsModal from "./components/invite-clients-modal";

const AddRemoveClients = () => {
  return (
    <div className="w-full pt-12 px-6 mb-8">
      {/* header */}
      <div className="flex flex-row justify-between items-center w-full">
        <div>
          <h1 className="text-xl font-medium tracking-[0.34px]">Add / Remove Clients</h1>
        </div>
        <div>
          <InviteClientsModal />
        </div>
      </div>

      <SeatsCount />
    </div>
  );
};

export default AddRemoveClients;
