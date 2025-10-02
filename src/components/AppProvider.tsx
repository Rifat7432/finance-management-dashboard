"use client";
import { persistor, store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>{children}</Provider>
      </PersistGate>
    </div>
  );
};

export default AppProvider;
