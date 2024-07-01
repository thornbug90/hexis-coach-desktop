import React, { useEffect, useState } from "react";
import { ISyncingStatus } from "./header-sync";
import XCircleIcon from "../icons/general/XCircleIcon";
import integrationIcons from "hexis/lib/integrations";
import { motion } from "framer-motion";
import ArrowClockwiseIcon from "../icons/general/ArrowClockwiseIcon";
type Props = {
  isSyncing: boolean;
  syncingStatus: ISyncingStatus[];
  setSyncingStatus: React.Dispatch<React.SetStateAction<ISyncingStatus[]>>;
  setIsSyncing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SyncingUpdatedStatusToast: React.FC<Props> = ({ isSyncing, syncingStatus, setSyncingStatus, setIsSyncing }) => {
  const [position, setPosition] = useState(100);

  useEffect(() => {
    if (!isSyncing && syncingStatus?.length > 0) {
      setPosition(0);
      const hiddenTimeOut = setTimeout(() => {
        setPosition(200);
      }, 3000);
      return () => {
        clearTimeout(hiddenTimeOut);
        setSyncingStatus([]);
      };
    } else {
      setPosition(100);
      return;
    }
  }, [isSyncing, setSyncingStatus, syncingStatus?.length]);

  const refetchWearable = () => {
    setPosition(100);
    setIsSyncing(true);
    setSyncingStatus([]);
  };
  const renderStatus = (status: ISyncingStatus, index: number) => {
    const { connected, isSynced, syncedNumbers, wearableSource } = status;
    const sourceName = integrationIcons.find(source => source.src === wearableSource)?.name;
    if (connected && isSynced) {
      return (
        <div className="flex items-center gap-2 w-full" key={index}>
          <div className="text-lightgrey1-600 text-base font-semibold w-5">{syncedNumbers}</div>
          <div className="text-lightgrey1-600 text-base font-light">Workouts added from {sourceName}</div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 w-full" key={index}>
          <XCircleIcon width={20} height={20} />
          <div className="text-lightgrey1-600 text-base font-light"> {syncedNumbers}</div>
        </div>
      );
    }
  };
  return (
    <motion.div
      className="flex p-4 justify-center items-start gap-6 absolute right-3 bottom-6 rounded-[12px] bg-lightgrey2-700 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: position, opacity: 1 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <div className="cursor-pointer active:opacity-75" onClick={refetchWearable}>
        <ArrowClockwiseIcon />
      </div>
      <div className="flex flex-col justify-center items-start gap-1">{syncingStatus.map(renderStatus)}</div>
    </motion.div>
  );
};
