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

        if (data.error) {
          throw new Error(data.error);
        }

        setChats(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getChats();
  }, []);

  return { loading, chats };
};

export default useGetChats;
