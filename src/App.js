import React from "react";
import { AuthContextProvider } from "./auth/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <AuthContextProvider>
      <SocketProvider>
        <AppRouter />
      </SocketProvider>
    </AuthContextProvider>
  );
};
