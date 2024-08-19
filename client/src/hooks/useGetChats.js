import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetChats = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/friendList");

        const data = await res.json();
        console.log(data); // Debugging

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch chats");
        }

        setChats(Array.isArray(data) ? data : []);

        setChats(data);
      } catch (error) {
        toast.error(error.message);
        setChats([]);
      } finally {
        setLoading(false);
      }
    };

    getChats();
  }, []);

  return { loading, chats };
};

export default useGetChats;
