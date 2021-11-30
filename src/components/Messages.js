import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { IncommingMessage } from "./IncommingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { SendMessage } from "./SendMessage";

export const Messages = () => {
  const {
    chatState: { mensajes },
  } = useContext(ChatContext);
  const {
    auth: { uid },
  } = useContext(AuthContext);

  return (
    <div className="mesgs">
      <div className="msg_history" id="mensajes">
        {mensajes.map((msg) =>
          msg.para === uid ? (
            <IncommingMessage key={msg._id} msg={msg} />
          ) : (
            <OutgoingMessage key={msg._id} msg={msg} />
          )
        )}
      </div>
      <SendMessage />
    </div>
  );
};
