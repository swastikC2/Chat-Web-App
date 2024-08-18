import React from "react";
import Chat from "./Chat";
import useGetChats from "../../hooks/useGetChats";

const Chats = () => {
  const { loading, chats } = useGetChats();
  // console.log(conversations)

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {chats.map((chat, index) => (
        <Chat
          key={chat._id}
          chat={chat}
          lastIndex={index === chat.length - 1}
        />
      ))}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Chats;
