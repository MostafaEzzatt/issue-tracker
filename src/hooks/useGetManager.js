import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

const useGetManager = (id) => {
  const [manager, setManager] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const users = useSelector((state) => state.users);
  useEffect(() => {
    if (id) {
      if (users.users.length > 0) {
        setManager(users.users.filter((user) => user.uuid == id)[0]);
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError("Something Went Wrong");
      }
    }
  }, [id]);

  return { manager, loading, error };
};

export default useGetManager;
