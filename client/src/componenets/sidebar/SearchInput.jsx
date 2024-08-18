import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";
import useChat from "../../zustand/useChat";
import useGetChats from "../../hooks/useGetChats";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedChat } = useChat();
  const { chats } = useGetChats();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    const chat = chats.find((chat) =>
      chat.username.toLowerCase().includes(search.toLowerCase())
    );

    if (chat) {
      setSelectedChat(chat);
      setSearch("");
    } else {
      toast.error("No user found with this username");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchOutline className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
