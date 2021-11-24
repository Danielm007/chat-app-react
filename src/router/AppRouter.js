import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChatPage } from "../pages/ChatPage";

import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/*" element={<AuthRouter />} />
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
};