import React from "react";
import useChat from "../../zustand/useChat";
import { useSocketContext } from "../../context/SocketContext";

const Chat = ({ chat, lastIndex }) => {
  const { selectedChat, setSelectedChat } = useChat();

  const isSelected = selectedChat?._id === chat._id;

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(chat._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-blue-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedChat(chat)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={chat.avatar} alt="" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-slate-700">{chat.username}</p>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Chat;
