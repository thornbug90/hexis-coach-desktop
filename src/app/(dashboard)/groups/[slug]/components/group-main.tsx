"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "hexis/hooks/useRedux";
import { IState } from "hexis/state/state";
import { isEmpty } from "lodash";
import { Goal, User } from "hexis/generated/graphql";
import AllGroupClients from "./all-group-clients";
import GroupSection from "./group-section";
import { useQuery } from "@tanstack/react-query";
import { getGroupsClients } from "hexis/lib/graphql-client";

type Props = {
  searchParams: {
    groupName: string;
    id: string;
  };
};

const GroupMain = ({ searchParams }: Props) => {
  const {
    data: groupClients,
    isLoading: isGroupClientsLoading,
    refetch: refetchGroupClients,
  } = useQuery({
    queryKey: ["getGroupsClients"],
    queryFn: () => getGroupsClients({ groupClientsId: searchParams?.id }),
  });

  const searchQuery = useAppSelector((state: IState) => state?.groups?.searchQuery);

  const clientsFilter = useAppSelector((state: IState) => state?.groups?.clientsFilter);

  const [filteredGroupClients, setFilteredGroupClients] = useState<User[]>([]);
  const [clientSports, setClientSports] = useState<string[] | []>([]);

  useEffect(() => {
    let sportsList: string[] = [];
    if (groupClients && !isEmpty(groupClients)) {
      groupClients.groupClients?.forEach(client => {
        if (client?.favouriteActivities) {
          sportsList.push(client.favouriteActivities[0]?.activity.name || "-");
        }
      });
    }
    if (sportsList) setClientSports(sportsList.filter(sport => sport !== "-"));
  }, [groupClients]);

  useEffect(() => {
    if (groupClients) {
      let newFilteredData = groupClients?.groupClients;

      if (!isEmpty(clientsFilter?.goals)) {
        newFilteredData = newFilteredData?.filter(data => clientsFilter?.goals?.includes(data?.goal || ("" as Goal)));
      }

      if (!isEmpty(clientsFilter?.sports)) {
        newFilteredData = newFilteredData?.filter(data =>
          clientsFilter?.sports?.includes(data?.favouriteActivities[0]?.activity?.name || ""),
        );
      }

      setFilteredGroupClients(newFilteredData as User[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsFilter]);

  useEffect(() => {
    if (groupClients) {
      let newFiltered = [...groupClients?.groupClients]?.sort((a, b) => {
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
      }) as unknown as User[];

      if (searchQuery) {
        newFiltered = filterList(searchQuery, newFiltered);
        setFilteredGroupClients(newFiltered);
      }
      if (isEmpty(searchQuery)) {
        setFilteredGroupClients(newFiltered);
      }
    }
  }, [groupClients, searchQuery]);

  function filterList(searchTerm: string, newFilteredData: User[]) {
    return newFilteredData?.filter(client => {
      const lowerCaseSearchTerm = searchTerm?.toLocaleLowerCase();

      const fullName = `${client?.firstName} ${client?.lastName}`;
      return fullName?.toLocaleLowerCase()?.includes(lowerCaseSearchTerm);
    });
  }

  return (
    <div className="w-full min-h-screen h-full bg-darkgrey1-600 rounded-[10px] md:rounded-t-[20px] lg:rounded-t-[40px] p-2 md:p-5 lg:p-10 mt-6">
      <GroupSection active={!isEmpty(groupClients)} sportsList={clientSports} />
      <AllGroupClients
        filteredGroupClients={filteredGroupClients}
        groupClients={groupClients?.groupClients as User[]}
        isGroupClientsLoading={isGroupClientsLoading}
        refetchGroupClients={refetchGroupClients}
      />
    </div>
  );
};

export default GroupMain;
