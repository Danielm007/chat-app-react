import React, { useContext } from "react";
import { api } from "../api/axiosClient";
import { ChatContext } from "../context/chat/ChatContext";
import { scrollToBottom } from "../helpers/scrollToBottom";
import { types } from "../types/types";

export const SideBarChatItem = ({ usuario }) => {
  const {
    chatState: { chatActivo },
    dispatch,
  } = useContext(ChatContext);

  const onClick = async () => {
    dispatch({
      type: types.activarChat,
      payload: usuario.uid,
    });
    //Cargar los mensajes del chat
    const { data } = await api.get(`/mensajes/${usuario.uid}`, {
      headers: {
        "x-token": localStorage.getItem("token") || null,
      },
    });
    dispatch({ type: types.cargarMensajes, payload: data.mensajes });
    scrollToBottom("mensajes");
  };

  return (
    <div
      className={`chat_list ${usuario.uid === chatActivo && "active_chat"}`}
      onClick={onClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{usuario.nombre}</h5>
          {usuario.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
