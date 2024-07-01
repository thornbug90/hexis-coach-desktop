import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import globalReducer from "hexis/state/global/slice";
import userReducer from "hexis/state/user/slice";
import carbCodingReducer from "hexis/state/carb-coding/slice";
import clientsReducer from "hexis/state/clients/slice";
import clientNotesReducer from "hexis/state/client-notes/slice";
import groupReducer from "hexis/state/groups/slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = {
  global: globalReducer,
  user: userReducer,
  carbCoding: carbCodingReducer,
  clients: clientsReducer,
  clientNotes: clientNotesReducer,
  groups: groupReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export default store;
