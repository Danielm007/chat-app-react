import React from "react";
import { AuthContextProvider } from "./auth/AuthContext";
import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
};
