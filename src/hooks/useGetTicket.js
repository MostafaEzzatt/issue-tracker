import { useState, useEffect } from "react";

//Redux
import { useSelector } from "react-redux";

const useGetTicket = (id) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tickets = useSelector((state) => state.tickets);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      const tempTicket = tickets.data.filter((ticket) => ticket.id == id);
      if (tempTicket.length > 0) {
        const author = users.users.filter(
          (user) => user.uuid == tempTicket[0].author.id
        );

        const assignedTo = users.users.filter(
          (user) =>
            tempTicket[0].assignedTo.findIndex(
              (member) => member.id == user.uuid
            ) !== -1
        );

        setTicket(
          Object.assign(
            { ...tempTicket[0] },
            { author: { ...author[0] }, assignedTo }
          )
        );

        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError("This Ticket Not Exist");
      }
    }
  }, [id, tickets]);

  return { ticket, loading, error };
};

export default useGetTicket;
