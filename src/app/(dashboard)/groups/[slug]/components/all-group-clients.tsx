"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hexis/hooks/useRedux";
import { Child, GetAllActiveClientsQuery, Goal, User } from "hexis/generated/graphql";
import AddClientsModal from "./add-client-modal";
import { GoalGainIcon, GoalLoseIcon, GoalMaintainIcon } from "hexis/components/icons/general";
import DeleteClient from "./delete-client";
import dayjs from "dayjs";
import { SEX } from "hexis/constants/user";
import { weightUnitConverter } from "hexis/utils/weightUnitConverter";
import { setSelectedClient } from "hexis/state/user/slice";
import { useRouter } from "next/navigation";
import { IState } from "hexis/state/state";
import ClientNotFound from "hexis/components/common/client-not-found";
import isEmpty from "lodash/isEmpty";

type Props = {
  groupClients: User[];
  filteredGroupClients: User[];
  isGroupClientsLoading: boolean;
  refetchGroupClients: () => void;
};

const AllGroupClients = ({ groupClients, filteredGroupClients, isGroupClientsLoading, refetchGroupClients }: Props) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const groupAssociatedClients = useAppSelector((state: IState) => state?.groups?.groupAssociatedClients?.groupClients);

  const [groupClientsIDs, setGroupClientsIDs] = useState<string[]>([]);

  useEffect(() => {
    const IDs = groupClients?.filter(client => client?.id)?.map(client => client?.id as string);
    setGroupClientsIDs(IDs || []);
  }, [groupClients]);

  const icon = (goal: Goal) => {
    switch (goal) {
      case Goal.Gain:
        return <GoalGainIcon />;
      case Goal.Lose:
        return <GoalLoseIcon />;
      case Goal.Maintain:
        return <GoalMaintainIcon />;
    }
  };

  const handleNavigation = (client?: GetAllActiveClientsQuery["getMyChildren"][0]) => () => {
    dispatch(setSelectedClient(client!));
    router.push("/client-fuel-plan");
  };

  const calculateAge = (dob: string) => dayjs().diff(dob, "year");

  return (
    <div className="w-full h-full py-3">
      {isGroupClientsLoading ? (
        "Loading ..."
      ) : (filteredGroupClients?.length || 0) > 0 ? (
        <>
          <div className="overflow-x-auto w-full h-full mt-2">
            <table className="table w-full">
              <thead className="text-sm underline text-white opacity-40">
                <tr className="border-none">
                  <th className="font-light">Name</th>
                  <th className="font-light">Age</th>
                  <th className="font-light">Gender</th>
                  <th className="font-light">Primary Sport</th>
                  <th className="font-light">Body weight</th>
                  <th className="font-light">Body Fat</th>
                  <th className="font-light">Goal</th>
                  <th className="font-light"></th>
                </tr>
              </thead>

              {/* results - fields */}
              <tbody className="bg-background-600">
                {filteredGroupClients
                  ?.slice()
                  ?.sort((a, b) => {
                    let nameA = a?.firstName.toUpperCase() || ""; // ignore upper and lowercase
                    let nameB = b?.firstName.toUpperCase() || ""; // ignore upper and lowercase
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    // names must be equal
                    return 0;
                  })
                  ?.map(client => {
                    return (
                      <tr
                        onClick={handleNavigation(client as unknown as Child)}
                        className=" hover:bg-background-300 cursor-pointer border-b-1 border-b-background-300 text-sm"
                        key={client?.id}
                      >
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex mask w-8 h-8 bg-activeblue-200 rounded-full justify-center items-center">
                              {client?.firstName && client?.firstName[0].toUpperCase()}
                              {client?.lastName && client?.lastName[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold pl-4">
                                {client?.firstName} {client?.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{client?.dob ? calculateAge(client?.dob) : "-"}</td>
                        <td>{client?.sex ? SEX[client.sex] : "-"}</td>
                        <td>{client?.favouriteActivities?.[0]?.activity.name || "-"}</td>
                        <td>{client?.weight ? `${weightUnitConverter(client?.weightUnit, client?.weight)}` : "-"}</td>
                        <td className="text-white text-xs opacity-40">Coming soon</td>
                        <td>{client?.goal ? icon(client.goal) : "-"}</td>
                        <td>
                          <DeleteClient id={client?.id || ""} refetch={refetchGroupClients} groupClientsList={groupClientsIDs} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      ) : !isEmpty(groupAssociatedClients) ? (
        <ClientNotFound isGroupPage />
      ) : (
        <div className="w-full h-full flex justify-center items-center my-[15%]">
          <AddClientsModal buttonText="Add your first client" className="gap-1 px-7 py-3 bg-background-300 w-fit h-[63px]" />
        </div>
      )}
    </div>
  );
};

export default AllGroupClients;
