"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hexis/hooks/useRedux";
import { useQuery } from "@tanstack/react-query";
import { getAllActiveClients, getGroupsClients, updateGroupClients } from "hexis/lib/graphql-client";
import { saveActiveClients } from "hexis/state/clients/slice";
import PlusIcon from "hexis/components/icons/general/PlusIcon";
import TickIcon from "hexis/components/icons/general/Tick";
import isEmpty from "lodash/isEmpty";
import activities from "hexis/constants/activities";
import { SEX } from "hexis/constants/user";
import { saveClients } from "hexis/state/groups/slice";
import { Child } from "hexis/generated/graphql";

const ModalContent = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [addedClients, setAddedClients] = useState<string[]>();
  const [filteredClients, setFilteredClients] = useState<Child[]>();
  const activeClients = useAppSelector(state => state.clients.activeClients?.getMyChildren);

  useEffect(() => {
    if (activeClients && !isEmpty(activeClients)) {
      let newFiltered = [...activeClients]?.sort((a, b) => {
        let nameA = a?.firstName.toUpperCase() || ""; // ignore upper and lowercase
        let nameB = b?.firstName.toUpperCase() || ""; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });

      if (searchQuery) {
        newFiltered = filterList(searchQuery, activeClients as Child[]);
        setFilteredClients(newFiltered as Child[]);
      }
      if (isEmpty(searchQuery)) {
        setFilteredClients(activeClients as Child[]);
      }
    }
  }, [activeClients, searchQuery]);

  function filterList(searchTerm: string, newFilteredData: Child[]) {
    return newFilteredData?.filter(client => {
      const lowerCaseSearchTerm = searchTerm?.toLocaleLowerCase();

      const fullName = `${client?.firstName} ${client?.lastName}`;
      return fullName?.toLocaleLowerCase()?.includes(lowerCaseSearchTerm);
    });
  }

  // clients that accepted the invites
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["getAllActiveClients"],
    queryFn: () => getAllActiveClients(),
  });

  const groupSelected = useAppSelector(state => state?.groups?.selectedGroup);

  const {
    data: groupClients,
    isLoading: isGroupClientsLoading,
    isRefetching: isGroupClientsRefetching,
    refetch: refetchGroupClients,
  } = useQuery({
    queryKey: ["getGroupsClients"],
    queryFn: () => getGroupsClients({ groupClientsId: groupSelected?.id || "" }),
  });

  const groupAssociatedClients = useAppSelector(state => state?.groups?.groupAssociatedClients?.groupClients);

  useEffect(() => {
    dispatch(saveClients(groupClients));
  }, [groupClients, dispatch]);

  useEffect(() => {
    dispatch(saveActiveClients(data));
  }, [data, dispatch]);

  useEffect(() => {
    const alreadyAddedClients = activeClients
      ?.filter(client => groupAssociatedClients?.find(groupAssociatedClient => groupAssociatedClient?.id === client?.id))
      .map(client => client?.id || "");

    if (!isEmpty(alreadyAddedClients)) {
      setAddedClients(alreadyAddedClients);
    } else {
      setAddedClients([]);
    }
  }, [groupAssociatedClients]);

  const handleAddClient = async (id: string) => {
    const values = [...(addedClients || ""), id];
    setAddedClients(values);

    await updateGroupClients({
      updateClientsId: groupSelected?.id || "",

      clientIds: values,
    });

    refetchGroupClients();
  };

  const handleRemoveClient = async (id: string) => {
    const values = addedClients?.filter(added => added !== id);
    setAddedClients(values);

    await updateGroupClients({
      updateClientsId: groupSelected?.id || "",

      clientIds: values || [],
    });

    refetchGroupClients();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[20px] font-medium">Add Clients</h2>

      <div className="flex flex-col gap-6">
        {isLoading || isRefetching || isGroupClientsLoading || isGroupClientsRefetching ? (
          "Loading ..."
        ) : (
          <>
            {(activeClients?.length || 0) > 0 ? (
              <>
                {/* client name */}
                <div className="bg-background-900 rounded-lg w-full px-4 py-2">
                  <label className="text-[10px] text-activeblue-100 uppercase tracking-widest font-semibold">Find client by name</label>
                  <input
                    placeholder="Enter name"
                    className="h-5 w-full outline-0 bg-background-900 tracking-[0.15px] placeholder-white placeholder-opacity-50 text-left"
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>

                <div>
                  <p className="font-semibold text-sm text-gray-100 pb-2"> All Clients</p>

                  <div className="rounded-xl bg-darkgrey1-600 p-3">
                    {!isEmpty(filteredClients) ? (
                      filteredClients?.map(client => {
                        {
                          const { icon: Icon } =
                            activities?.[client?.favouriteActivities?.[0]?.activity.id as keyof typeof activities] || [];
                          return (
                            <div
                              key={client?.id}
                              className="bg-background-900 px-4 py-2 flex items-center justify-between rounded-lg text-xs mb-2 last:mb-0"
                            >
                              <div className="flex gap-2 items-center w-2/5">
                                <div className="bg-activeblue-100 rounded-full w-6 h-6 flex items-center justify-center">
                                  {client?.firstName && client?.firstName[0].toUpperCase()}
                                  {client?.lastName && client?.lastName[0].toUpperCase()}
                                </div>

                                <p>{`${client?.firstName} ${client?.lastName}`}</p>
                              </div>

                              <div className="flex w-[35%] items-center gap-3">
                                {Icon && <Icon color="#FFF" width={20} height={20} />}
                                {client?.favouriteActivities[0]?.activity.name || "-"}
                              </div>

                              <p className="w-[15%]">{client?.sex ? SEX[client.sex] : "-"}</p>

                              <div className="w-auto">
                                {addedClients?.find(addedClient => addedClient === client?.id) ? (
                                  <p
                                    className="h-6 w-6 rounded-full bg-carbcodehigh-600 flex justify-center items-center"
                                    onClick={() => handleRemoveClient(client?.id || "")}
                                  >
                                    <TickIcon />
                                  </p>
                                ) : (
                                  <p
                                    className="h-6 w-6 rounded-full bg-activeblue-100 flex justify-center items-center"
                                    onClick={() => handleAddClient(client?.id || "")}
                                  >
                                    <PlusIcon strokeWidth={2} height={16} width={16} />
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        }
                      })
                    ) : (
                      <div className="bg-background-900 px-4 py-2 flex items-center justify-between rounded-lg text-xs">
                        {" "}
                        Client not found
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="font-semibold text-sm text-gray-100">Add Clients first</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModalContent;
