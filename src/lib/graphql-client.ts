"use client";

import { GraphQLClient } from "graphql-request";
import { QueryClient } from "@tanstack/react-query";
import { getSdk, Invitation_Status } from "hexis/generated/graphql";
import { saveActiveClients, saveInvitesPending } from "hexis/state/clients/slice";

export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string);

export const {
  user: getUser,
  userById,
  getCoachClients,
  getDayByDateRange,
  addMoreSeats,
  getAllInvitations,
  sendInvitations,
  resendInvitation,
  cancelInvitation,
  getAllActiveClients,
  availableSeats,
  removeClient,
  liveGraphByDate,
  liveGraphClientByDate,
  foodLog: getFoodLog,
  getClientNotes,
  addClientNote,
  deleteClientNote,
  updateClientNote,
  updateUser,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getAllAssociatedGroups,
  createAGroup,
  getGroupsClients,
  updateGroupClients,
  addGroupWorkout,
  deleteGroup,
  updateGroup,
  updateMealplan,
  carbRange,
  addMeal,
  updateMeal,
  deleteMeal,
  OnDemandSync,
  wearableSources,
} = getSdk(graphqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export const refreshAllInvitations = async (dispatcher: Function) => {
  const response = await getAllInvitations();
  const result = response.listInvitations.filter(
    invitation =>
      invitation?.status === Invitation_Status.Pending.toUpperCase() || invitation?.status === Invitation_Status.Expired.toUpperCase(),
  );
  dispatcher(saveInvitesPending({ listInvitations: result }));
};

export const refreshAllClients = async (dispatcher: Function) => {
  const response = await getAllActiveClients();
  dispatcher(saveActiveClients(response));
};
