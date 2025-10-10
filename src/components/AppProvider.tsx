"use client";
import { persistor, store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Toaster position="bottom-right" />
          {children}
        </Provider>
      </PersistGate>
    </div>
  );
};

export default AppProvider;
