import { Note } from "hexis/generated/graphql";
import { createSlice } from "@reduxjs/toolkit";
import { SLICES } from "hexis/constants/store";

export interface IClientNotesState {
  notes: Note[];
  selectedNote?: Note;
}

const initialState: IClientNotesState = {
  notes: [],
  selectedNote: undefined,
};

export const clientNotesSlice = createSlice({
  name: SLICES.NOTES_SLICE,
  initialState,
  reducers: {
    setNotes: (state: IClientNotesState, action) => {
      state.notes = action.payload;
    },
    setSelectedNote: (state: IClientNotesState, action) => {
      state.selectedNote = action.payload;
    },
  },
});

export const { setNotes, setSelectedNote } = clientNotesSlice.actions;
export default clientNotesSlice.reducer;
