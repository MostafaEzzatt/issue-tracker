import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../firebase";

const useGetManager = (id) => {
  const [manager, setManager] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const docRef = doc(firestore, "Users", id);
      getDoc(docRef)
        .then((data) => {
          setManager(data.data());
          setLoading(false);
        })
        .catch((error) => {
          setError("Something Went Wrong");
        });
    }
  }, [id]);

  return { manager, loading, error };
};

export default useGetManager;
