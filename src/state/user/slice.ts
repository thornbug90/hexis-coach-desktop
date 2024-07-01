import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SLICES } from "hexis/constants/store";
import { DayByDateQuery, GetAllActiveClientsQuery, GetDayByDateRangeQuery, Goal, UserQuery } from "hexis/generated/graphql";

export interface IFilter {
  goals: Goal[];
  sports: string[];
}

export type IUser = UserQuery["user"];

export interface UserState {
  user?: IUser;
  coachClients: GetAllActiveClientsQuery | undefined;
  selectedClient?: GetAllActiveClientsQuery["getMyChildren"][0] | null;
  selectedClientDay?: GetDayByDateRangeQuery["days"];
  clientsFilter?: IFilter;
  currentSelectedDay?: DayByDateQuery["day"];
  loading: boolean;
  searchQuery?: string;
  coachStatus: boolean;
  startDate: string;
  endDate: string;
  loggingOut: boolean;
}

const initialState: UserState = {
  user: undefined,
  coachClients: undefined,
  selectedClient: undefined,
  selectedClientDay: undefined,
  clientsFilter: undefined,
  loading: false,
  currentSelectedDay: undefined,
  searchQuery: "",
  coachStatus: false,
  startDate: "",
  endDate: "",
  loggingOut: false,
};

export const userSlice = createSlice({
  name: SLICES.USER_SLICE,
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<IUser | undefined>) => {
      state.user = action.payload;
    },
    setCoachClients: (state: UserState, action: PayloadAction<GetAllActiveClientsQuery>) => {
      state.coachClients = action.payload;
    },
    setSelectedClient: (state: UserState, action: PayloadAction<GetAllActiveClientsQuery["getMyChildren"][0] | undefined>) => {
      state.selectedClient = action.payload;
    },
    setSelectedClientDay: (state: UserState, action: PayloadAction<GetDayByDateRangeQuery["days"]>) => {
      state.selectedClientDay = action.payload;
    },
    setClientsFilter: (state: UserState, action: PayloadAction<IFilter>) => {
      state.clientsFilter = action.payload;
    },
    setUserLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentSelectedDay: (state: UserState, action: PayloadAction<DayByDateQuery["day"] | undefined>) => {
      state.currentSelectedDay = action.payload;
    },
    setSearchQuery: (state: UserState, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCoachStatus: (state: UserState, action: PayloadAction<boolean>) => {
      state.coachStatus = action.payload;
    },
    setClientStartDate: (state: UserState, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setClientEndDate: (state: UserState, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setLoggingOut: (state: UserState, action: PayloadAction<boolean>) => {
      state.loggingOut = action.payload;
    },
  },
});

export const {
  setUser,
  setCoachClients,
  setSelectedClient,
  setSelectedClientDay,
  setClientsFilter,
  setUserLoading,
  setCurrentSelectedDay,
  setSearchQuery,
  setCoachStatus,
  setClientStartDate,
  setClientEndDate,
  setLoggingOut,
} = userSlice.actions;
export default userSlice.reducer;
