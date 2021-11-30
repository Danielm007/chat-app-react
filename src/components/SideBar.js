import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SideBarChatItem } from "./SideBarChatItem";

export const SideBar = () => {
  const {
    chatState: { usuarios },
  } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="inbox_chat">
      {usuarios
        .filter((u) => u.uid !== auth.uid)
        .map((user) => (
          <SideBarChatItem key={user.uid} usuario={user} />
        ))}
      <div className="extra_space"></div>
    </div>
  );
};
