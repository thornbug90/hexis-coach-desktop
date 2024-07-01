import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SLICES } from "hexis/constants/store";

export interface GlobalState {
  demo: number;
  loading: boolean;
  sidebarOpen: boolean;
}

const initialState: GlobalState = {
  demo: 0,
  loading: false,
  sidebarOpen: false,
};

export const globalSlice = createSlice({
  name: SLICES.GLOBAL_SLICE,
  initialState,
  reducers: {
    increment: (state: GlobalState) => {
      state.demo += 1;
    },
    incrementByAmount: (state: GlobalState, action: PayloadAction<number>) => {
      state.demo += action.payload;
    },
    setGlobalLoading: (state: GlobalState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    hideSidebar: (state: GlobalState) => {
      state.sidebarOpen = false;
    },
    showSidebar: (state: GlobalState) => {
      state.sidebarOpen = true;
    },
  },
});

export const { increment, incrementByAmount, setGlobalLoading, hideSidebar, showSidebar } = globalSlice.actions;
export default globalSlice.reducer;
