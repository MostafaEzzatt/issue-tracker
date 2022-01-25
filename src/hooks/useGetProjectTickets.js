import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

const useGetProjectTickets = (projectId) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reduxTickets = useSelector((state) => state.tickets);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (reduxTickets.data.length > 0) {
      const tempTickets = reduxTickets.data.filter(
        (ticket) => ticket.project.id == projectId
      );

      if (tempTickets.length > 0) {
        const getAuthorData = tempTickets.map((ticket) => {
          const tempAuthor = users.users.filter(
            (user) => user.uuid == ticket.author.id
          );

          return Object.assign({ ...ticket }, { author: { ...tempAuthor[0] } });
        });

        setTickets(getAuthorData);
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError("This Project Dont Have Any Tickets Yet!");
      }
    } else {
      setLoading(false);
      setError("This Project Dont Have Any Tickets Yet!");
    }
  }, [reduxTickets, projectId]);

  return { tickets, loading, error };
};

export default useGetProjectTickets;
