"use client";

import React from "react";
import store, { persistor } from "hexis/state/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

function StateProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default StateProvider;
