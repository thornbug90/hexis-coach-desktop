"use client";

import AllClientsHeader from "@components/common/all-clients-header";
import AllClientsTable from "@components/common/all-clients-table";
import NoClients from "@components/common/no-clients";
import { useDispatch } from "react-redux";
import { useAppSelector } from "hexis/hooks/useRedux";
import { useQuery } from "@tanstack/react-query";
import { getAllActiveClients, getUser } from "hexis/lib/graphql-client";
import { setActiveClientsLoading } from "hexis/state/clients/slice";
import { useEffect, useState } from "react";
import { IFilter, setClientsFilter, setCoachClients, setCoachStatus, setSearchQuery, setUser } from "hexis/state/user/slice";
import { GetAllActiveClientsQuery, Goal } from "hexis/generated/graphql";
import isEmpty from "lodash/isEmpty";
import { isCoach } from "hexis/utils/entitlementsChecker";
import { AthleteMain } from "./AthleteMain";

export default function Main() {
  const dispatch = useDispatch();

  const { data: activeUser } = useQuery({
    queryKey: ["getSessionUser"],
    queryFn: () => getUser({}),
  });

  useEffect(() => {
    if (activeUser) {
      dispatch(setUser(activeUser.user));
      dispatch(setCoachStatus(isCoach(activeUser.user)));
    }
  }, [activeUser, dispatch]);

  const [filteredCoachClients, setFilteredCoachClients] = useState<GetAllActiveClientsQuery["getMyChildren"]>([]);

  const [clientSports, setClientSports] = useState<string[] | []>([]);

  const { coachClients, clientsFilter, user, searchQuery, coachStatus } = useAppSelector(
    ({ user: { loading, user, coachClients, clientsFilter, searchQuery, selectedClient, coachStatus } }) => ({
      loading,
      coachClients,
      clientsFilter,
      user,
      searchQuery,
      selectedClient,
      coachStatus,
    }),
  );

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["getAllActiveClients"],
    queryFn: () => getAllActiveClients(),
  });

  useEffect(() => {
    if (data) {
      dispatch(setCoachClients(data));
    }

    return () => {
      // dispatch(setCoachClients([]));
    };
  }, [data, data?.getMyChildren, dispatch]);

  useEffect(() => {
    const clients = coachClients?.getMyChildren?.map(client => client) || [];
    setFilteredCoachClients(clients);
    let sportsList: string[] = [];
    if (clients) {
      clients.forEach(client => {
        if (client?.favouriteActivities) {
          const activityName = client.favouriteActivities[0]?.activity.name || "-";
          if (!sportsList.includes(activityName)) {
            sportsList.push(activityName);
          }
        }
      });
    }
    if (sportsList) setClientSports(sportsList.filter(sport => sport !== "-"));
  }, [coachClients]);

  useEffect(() => {
    if (coachClients) {
      let newFilteredData = coachClients?.getMyChildren;

      if (!isEmpty(clientsFilter?.goals)) {
        newFilteredData = newFilteredData?.filter(data => clientsFilter?.goals?.includes(data?.goal || ("" as Goal)));
      }

      if (!isEmpty(clientsFilter?.sports)) {
        newFilteredData = newFilteredData?.filter(data =>
          clientsFilter?.sports?.includes(data?.favouriteActivities[0]?.activity?.name || ""),
        );
      }

      setFilteredCoachClients(newFilteredData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsFilter]);

  useEffect(() => {
    if (coachClients) {
      let newFiltered = [...coachClients?.getMyChildren]?.sort((a, b) => {
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
        newFiltered = filterList(searchQuery, coachClients);
        setFilteredCoachClients(newFiltered);
      }
      if (isEmpty(searchQuery)) {
        setFilteredCoachClients(coachClients?.getMyChildren);
      }
    }
  }, [coachClients, searchQuery]);

  function filterList(searchTerm: string, newFilteredData: GetAllActiveClientsQuery) {
    return newFilteredData?.getMyChildren?.filter(client => {
      const lowerCaseSearchTerm = searchTerm?.toLocaleLowerCase();

      const fullName = `${client?.firstName} ${client?.lastName}`;
      return fullName?.toLocaleLowerCase()?.includes(lowerCaseSearchTerm);
    });
  }

  useEffect(() => {
    if (isLoading || isRefetching) {
      dispatch(setActiveClientsLoading(true));
    }
    if (!isLoading && !isRefetching) {
      dispatch(setActiveClientsLoading(false));
    }
  }, [dispatch, isLoading, isRefetching]);

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery("") as any);
      dispatch(setClientsFilter({} as IFilter) as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {user &&
        (coachStatus ? (
          <>
            <header className="w-full">
              <AllClientsHeader active={!isEmpty(coachClients?.getMyChildren)} sports={clientSports} />
            </header>

            <section className="w-full">
              {coachClients?.getMyChildren && !isEmpty(coachClients.getMyChildren) ? (
                <AllClientsTable allClients={filteredCoachClients} />
              ) : (
                <NoClients />
              )}
            </section>
          </>
        ) : (
          <AthleteMain user={activeUser?.user || user} />
        ))}
    </>
  );
}
