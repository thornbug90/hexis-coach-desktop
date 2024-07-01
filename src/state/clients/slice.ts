import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SLICES } from "hexis/constants/store";
import { GetAllActiveClientsQuery, GetAllInvitationsQuery } from "hexis/generated/graphql";

export interface IClientsState {
  loading: boolean;

  invitesPending: GetAllInvitationsQuery | undefined;
  activeClients: GetAllActiveClientsQuery | undefined;

  leftSeatsToAddPendingClients: number;

  allAvailableSeats: number;
  totalNumberOfSeats: number;
}

const initialState: IClientsState = {
  loading: false,

  invitesPending: undefined,
  activeClients: undefined,

  leftSeatsToAddPendingClients: 0,

  allAvailableSeats: 0,
  totalNumberOfSeats: 0,
};

export const clientSlice = createSlice({
  name: SLICES.CLIENT_SLICE,
  initialState,
  reducers: {
    setActiveClientsLoading: (state: IClientsState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    saveInvitesPending: (state: IClientsState, action: PayloadAction<GetAllInvitationsQuery | undefined>) => {
      state.invitesPending = action.payload;
    },
    saveActiveClients: (state: IClientsState, action: PayloadAction<GetAllActiveClientsQuery | undefined>) => {
      state.activeClients = action.payload;
    },
    saveNumberOfAvailableSeats: (state: IClientsState, action: PayloadAction<number>) => {
      state.allAvailableSeats = action.payload;
    },
    saveTotalNumberOfSeats: (state: IClientsState, action: PayloadAction<number>) => {
      state.totalNumberOfSeats = action.payload;
    },
    saveLeftSeatsToAddPendingClients: (state: IClientsState, action: PayloadAction<number>) => {
      state.leftSeatsToAddPendingClients = action.payload;
    },
  },
});

export const {
  setActiveClientsLoading,
  saveInvitesPending,
  saveActiveClients,
  saveNumberOfAvailableSeats,
  saveTotalNumberOfSeats,
  saveLeftSeatsToAddPendingClients,
} = clientSlice.actions;

export default clientSlice.reducer;
