import { createContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";

export const ChatContext = createContext();

const initialState = {
  uid: "",
  chatActivo: null, //UID del usuario al que yo quiero enviar mensajes
  usuarios: [], //Todos los usuarios de la base de datos
  mensajes: [], //Chat seleccionado
};

export const ChatContextProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
