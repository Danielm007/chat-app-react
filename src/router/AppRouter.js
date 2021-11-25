import React, { useContext, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { ChatPage } from "../pages/ChatPage";

import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { verificaToken, auth } = useContext(AuthContext);

  useEffect(() => {
    verificaToken();
  }, [verificaToken]);

  if (auth.checking) {
    return <h1>Espere por favor...</h1>;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PublicRoute>
                <AuthRouter />
              </PublicRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};
