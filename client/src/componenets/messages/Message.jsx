import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useChat from "../../zustand/useChat";
import { formatTime } from "../../utils/formatTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();

  const { selectedChat } = useChat();

  const messageFromMe = message.senderId === authUser._id;

  const chatClassName = messageFromMe ? "chat-end" : "chat-start";

  const avatar = messageFromMe ? authUser.avatar : selectedChat?.avatar;

  const msgBgColor = messageFromMe ? "bg-green-500" : "";

  const formattedTime = formatTime(message.createdAt);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} alt="User Avatar" />
        </div>
      </div>

      <div className={`chat-bubble text-white ${msgBgColor}`}>
        {message.message}
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-slate-950">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
