import React from "react";
import { AuthContextProvider } from "./auth/AuthContext";
import { ChatContextProvider } from "./context/chat/ChatContext";
import { SocketProvider } from "./context/SocketContext";
import { AppRouter } from "./router/AppRouter";

import moment from "moment";
import "moment/locale/es";

moment.locale("es");

export const App = () => {
  return (
    <ChatContextProvider>
      <AuthContextProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthContextProvider>
    </ChatContextProvider>
  );
};
