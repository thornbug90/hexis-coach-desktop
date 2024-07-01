import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SLICES } from "hexis/constants/store";
import { CARB_CODING } from "hexis/constants/carbCoding";

export interface CarbCodingState {
  fuelPlanView: CARB_CODING;
  loading: boolean;
  macrosAndEnergy: boolean;
}

const initialState: CarbCodingState = {
  fuelPlanView: CARB_CODING.PLANNED_VIEW,
  loading: false,
  macrosAndEnergy: true,
};

export const carbCodingSlice = createSlice({
  name: SLICES.CARB_CODING_SLICE,
  initialState,
  reducers: {
    setFuelPlanView: (state: CarbCodingState, action: PayloadAction<CARB_CODING>) => {
      state.fuelPlanView = action.payload;
    },
    setCarbLoading: (state: CarbCodingState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    showOrHideMacrosAndEnergy: (state: CarbCodingState, action: PayloadAction<boolean>) => {
      state.macrosAndEnergy = action.payload;
    },
  },
});

export const { setFuelPlanView, setCarbLoading, showOrHideMacrosAndEnergy } = carbCodingSlice.actions;
export default carbCodingSlice.reducer;
