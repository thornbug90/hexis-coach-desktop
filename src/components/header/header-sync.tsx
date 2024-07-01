import { featureFlags } from "hexis/app/flags";
import React, { useState } from "react";
import WearableSyncingModal from "./wearable-syncing-modal";
import { SyncingUpdatedStatusToast } from "./syncing-updated-status-toast";
import { WearableConfirmedIcon } from "../icons/general";
import SubtractIcon from "../icons/general/SubtractIcon";

export type ISyncingStatus = {
  connected: boolean;
  syncedNumbers: number;
  isSynced: boolean;
  wearableSource: string;
};

export const HeaderSync: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncingStatus, setSyncingStatus] = useState([] as ISyncingStatus[]);
  const onClickSync = () => {
    setIsSyncing(true);
  };
  return (
    <>
      <SyncingUpdatedStatusToast
        syncingStatus={syncingStatus}
        setSyncingStatus={setSyncingStatus}
        isSyncing={isSyncing}
        setIsSyncing={setIsSyncing}
      />
      <WearableSyncingModal isOpen={isSyncing} setIsOpen={setIsSyncing} setSyncingStatus={setSyncingStatus} />
      {featureFlags.triggerBasedSync && (
        <button
          onClick={onClickSync}
          aria-label="Sync"
          className="relative flex w-14 h-14 justify-center items-center rounded-lg border-[1px] border-activeblue-100"
        >
          <SubtractIcon width={22} height={22} color="#FFF" />
          <div className="absolute right-2.5 bottom-2">
            <WearableConfirmedIcon width={20} height={20} color="#359CEF" className="z-[999]" />
          </div>
        </button>
      )}
    </>
  );
};
