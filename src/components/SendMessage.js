import React, { useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";

export const SendMessage = () => {
  const [mensaje, setMensaje] = useState("");
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const {
    chatState: { chatActivo },
  } = useContext(ChatContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mensaje.trim() === "") return;

    //Emitir evento de sockets para enviar el mensaje
    /* 
      de: persona que envia el mensaje (uid)
      para: persona a la que se dirige el mensaje (uid)
      mensaje: lo que quiero mandar como mensaje
    */
    socket.emit("mensaje-personal", {
      de: auth.uid,
      para: chatActivo,
      mensaje,
    });

    //Hacer el dispatch del mensaje

    setMensaje("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            onChange={({ target }) => setMensaje(target.value)}
            value={mensaje}
            name="mensaje"
            className="write_msg"
            placeholder="Mensaje..."
            autoComplete="off"
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
