import React, { useEffect, useState } from "react";
import CheckCircleIcon from "../icons/general/CheckCircleIcon";
import XCircleIcon from "../icons/general/XCircleIcon";
import { OnDemandSyncDocument, OnDemandSyncQuery, WearableSource, Wearable_Status, Workout_Source } from "hexis/generated/graphql";
import { graphqlClient, queryClient } from "hexis/lib/graphql-client";
import integrationIcons from "hexis/lib/integrations";
import { useAppSelector } from "hexis/hooks/useRedux";
import { ISyncingStatus } from "./header-sync";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSyncingStatus: React.Dispatch<React.SetStateAction<ISyncingStatus[]>>;
};

type syncResult = {
  connected?: boolean;
  syncedNumbers: number | string;
  isSynced?: boolean;
  wearableSource?: Workout_Source;
};

const initialSyncingStatus: syncResult = {
  connected: undefined,
  syncedNumbers: 0,
  isSynced: undefined,
  wearableSource: Workout_Source.TrainingPeaks,
};

const doOnDemandSync = async (wearables: WearableSource[], athleteId: string) => {
  const result: OnDemandSyncQuery = await graphqlClient.request(OnDemandSyncDocument, {
    input: { providers: wearables.map(wearable => wearable.id), userId: athleteId },
  });
  const syncResult: syncResult[] = [];
  result.onDemandSync?.map(provider => {
    const wearableSource = wearables.filter(wearable => wearable.id === provider?.provider)?.[0];
    const workoutSource =
      wearableSource.name === "TrainingPeaks"
        ? Workout_Source.TrainingPeaks
        : wearableSource.name === "Apple Health"
          ? Workout_Source.AppleHealth
          : wearableSource.name === "Health Connect"
            ? Workout_Source.HealthConnect
            : undefined;
    syncResult.push({
      connected: provider?.status === "SUCCESS" ? true : false,
      syncedNumbers: provider?.status === "SUCCESS" ? Number(provider.message) : provider ? provider.message : 0,
      isSynced: provider?.status === "SUCCESS" ? true : false,
      wearableSource: workoutSource,
    });
  });

  return syncResult;
};

const WearableSyncingModal: React.FC<Props> = ({ isOpen, setIsOpen, setSyncingStatus }) => {
  const [syncingIndividualStatus, setSyncingIndividualStatus] = useState(initialSyncingStatus);

  const wearableIcon = integrationIcons.find(source => source.src === syncingIndividualStatus?.wearableSource)?.icon;
  const { selectedClient } = useAppSelector(({ user: { selectedClient } }) => ({
    selectedClient,
  }));

  useEffect(() => {
    const syncingWearableFunction = async () => {
      const results = [];
      let result = {};
      const athleteWearables: WearableSource[] = [];
      const athleteId = selectedClient?.id;
      selectedClient?.wearableSources.map(source => {
        if (source) athleteWearables.push(source);
      });

      if (athleteId && athleteWearables && athleteWearables.length > 0) {
        setSyncingIndividualStatus(initialSyncingStatus);
        const syncResults = await doOnDemandSync(athleteWearables, athleteId);

        //trainingpeaks
        console.log({ syncResults });
        let trainingPeaksResutlt = syncResults?.filter(provider => provider?.wearableSource === Workout_Source.TrainingPeaks)?.[0];
        let trainingPeaksWearable = athleteWearables.filter(wearable => wearable.name === "TrainingPeaks")?.[0];
        if (trainingPeaksWearable && trainingPeaksWearable.status !== Wearable_Status.Disconnected) {
          result = {
            connected: trainingPeaksResutlt.connected,
            syncedNumbers:
              trainingPeaksResutlt.connected && trainingPeaksResutlt.isSynced
                ? Number(trainingPeaksResutlt?.syncedNumbers)
                : trainingPeaksResutlt.syncedNumbers,
            isSynced: trainingPeaksResutlt.isSynced,
            wearableSource: Workout_Source.TrainingPeaks,
          };
          setSyncingIndividualStatus(result as any);
          results.push(result);
          setSyncingStatus(results as []);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // Apple Health
        let appleHealthResult = syncResults?.filter(provider => provider?.wearableSource === Workout_Source.AppleHealth)?.[0];
        let appleHealthWearable = athleteWearables.filter(wearable => wearable.name === "Apple Health")?.[0];
        if (appleHealthWearable && appleHealthWearable.status !== Wearable_Status.Disconnected) {
          initialSyncingStatus.wearableSource = Workout_Source.AppleHealth;
          setSyncingIndividualStatus(initialSyncingStatus);
          result = {
            connected: appleHealthResult.connected,
            syncedNumbers:
              appleHealthResult.connected && appleHealthResult.isSynced
                ? Number(appleHealthResult?.syncedNumbers)
                : appleHealthResult.syncedNumbers,
            isSynced: appleHealthResult.isSynced,
            wearableSource: Workout_Source.AppleHealth,
          };
          setSyncingIndividualStatus(result as any);
          results.push(result);
          setSyncingStatus(results as []);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // Health Connect Health
        let healthConnectResult = syncResults?.filter(provider => provider?.wearableSource === Workout_Source.HealthConnect)?.[0];
        let healthConnectWearable = athleteWearables.filter(wearable => wearable.name === "Health Connect")?.[0];
        if (healthConnectWearable && healthConnectWearable.status !== Wearable_Status.Disconnected) {
          initialSyncingStatus.wearableSource = Workout_Source.HealthConnect;
          setSyncingIndividualStatus(initialSyncingStatus);
          result = {
            connected: healthConnectResult.connected,
            syncedNumbers:
              healthConnectResult.connected && healthConnectResult.isSynced
                ? Number(healthConnectResult?.syncedNumbers)
                : healthConnectResult.syncedNumbers,
            isSynced: healthConnectResult.isSynced,
            wearableSource: Workout_Source.HealthConnect,
          };
          setSyncingIndividualStatus(result as any);
          results.push(result);
          setSyncingStatus(results as []);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
        initialSyncingStatus.wearableSource = Workout_Source.TrainingPeaks;
        setIsOpen(false);
      }
    };

    if (isOpen) {
      syncingWearableFunction();
    } else {
      queryClient.setQueryData(["onDemandSync"], null);
    }
  }, [isOpen]);
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background-300 rounded-3xl">
        <div className="w-[400px] p-10 pt-[60px] gap-6 flex flex-col justify-center items-center relative">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            {
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img src={wearableIcon} width={80} height={80} className="w-20 h-20 rounded-lg" />
            }
          </div>
          <div className="gap-2 flex justify-center items-center">
            <span className="text-white text-[18px] tracing-[0.5px]">Connecting</span>
            {syncingIndividualStatus?.connected === true && <CheckCircleIcon />}
            {syncingIndividualStatus?.connected === false && <XCircleIcon />}
          </div>
          <div className="gap-2 flex justify-center items-center">
            <span className="text-white text-[18px] tracing-[0.5px]">Syncing Workouts {"..."}</span>
            {syncingIndividualStatus?.isSynced === true && <CheckCircleIcon />}
            {syncingIndividualStatus?.isSynced === false && <XCircleIcon />}
          </div>
          <span className="text-white text-[18px] tracing-[0.5px]">Updating Fuel Plans {"..."}</span>
        </div>
      </div>
    </div>
  );
};

export default WearableSyncingModal;
