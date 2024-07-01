import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SLICES } from "hexis/constants/store";
import { GetAllAssociatedGroupsQuery, GetGroupsClientsQuery, Group, GroupAndMemberCount } from "hexis/generated/graphql";
import { IFilter } from "../user/slice";

export interface IGroupState {
  allAssociatedGroups: GetAllAssociatedGroupsQuery | undefined;
  groupAssociatedClients: GetGroupsClientsQuery | undefined;

  selectedGroup: Group | undefined;
  searchQuery?: string;
  clientsFilter?: IFilter;
}

const initialState: IGroupState = {
  allAssociatedGroups: undefined,
  groupAssociatedClients: undefined,
  selectedGroup: undefined,
  searchQuery: undefined,
  clientsFilter: undefined,
};

export const groupSlice = createSlice({
  name: SLICES.GROUP_SLICE,
  initialState,
  reducers: {
    saveGroups: (state: IGroupState, action: PayloadAction<GetAllAssociatedGroupsQuery | undefined>) => {
      state.allAssociatedGroups = action.payload;
    },
    addGroup: (state: IGroupState, action: PayloadAction<Group>) => {
      const allGroupsState = state.allAssociatedGroups?.groups || [];
      const newGroups = [
        ...allGroupsState,
        {
          __typename: "GroupAndMemberCount",
          memberCount: 0,
          group: action.payload,
        } as GroupAndMemberCount,
      ];
      state.allAssociatedGroups = { __typename: "Query", groups: newGroups };
    },
    saveClients: (state: IGroupState, action: PayloadAction<GetGroupsClientsQuery | undefined>) => {
      state.groupAssociatedClients = action.payload;
    },
    saveSelectedGroup: (state: IGroupState, action: PayloadAction<Group | undefined>) => {
      state.selectedGroup = action.payload;
    },
    setGroupClientsFilter: (state: IGroupState, action: PayloadAction<IFilter>) => {
      state.clientsFilter = action.payload;
    },
    setGroupClientsSearchQuery: (state: IGroupState, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { saveGroups, addGroup, saveClients, saveSelectedGroup, setGroupClientsFilter, setGroupClientsSearchQuery } =
  groupSlice.actions;

export default groupSlice.reducer;
