import { useState, useEffect } from "react";

//Redux
import { useSelector } from "react-redux";

const useGetTickets = () => {
  const users = useSelector((state) => state.users);
  const ticketsInput = useSelector((state) => state.tickets.data);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tempTickets = [];
    if (ticketsInput.length > 0) {
      tempTickets = ticketsInput.map((ticket) => {
        const assignedTo = users.users.filter(
          (user) =>
            ticket.assignedTo.findIndex((member) => member.id == user.uuid) !==
            -1
        );

        const author = users.users.filter(
          (user) => user.uuid == ticket.author.id
        );

        return Object.assign(
          { ...ticket },
          { assignedTo, author: { ...author[0] } }
        );
      });

      setTickets(tempTickets);
      setError(null);
      setLoading(false);
    } else {
      setError("There Is No Tickets?!");
      setLoading(false);
    }
  }, [ticketsInput, users]);

  return { tickets, error, loading };
};

export default useGetTickets;
