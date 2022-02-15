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
        const tempManager = users.users.filter((user) => user.uuid == id);

        if (tempManager.length > 0) {
          setManager(users.users.filter((user) => user.uuid == id)[0]);
          setError(null);
        } else {
          setManager(null);
          setError("This Manager Not Exist");
        }
        setLoading(false);
      } else {
        setLoading(false);
        setError("Something Went Wrong");
      }
    }
  }, [id]);

  return { manager, loading, error };
};

export default useGetManager;
