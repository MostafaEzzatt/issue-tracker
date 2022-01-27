import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// Custom Hooks
import useGetAllProjects from "./useGetAllProjects";

const useGetNotVisitedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const actions = useSelector((state) => state.actions);
  const reduxTickets = useSelector((state) => state.tickets);
  const {
    projects,
    loading: projectsLoading,
    error: projectErrors,
  } = useGetAllProjects();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (reduxTickets.data.length > 0 && projects.length > 0) {
      const ticketsActions = actions.data.filter(
        (action) => action.type == "VISITED_TICKET"
      );

      const AllTicketsNotVisited = reduxTickets.data.filter(
        (ticket) =>
          ticketsActions.findIndex(
            (actionTicket) => actionTicket.id.split("_")[0] == ticket.id
          ) == -1
      );

      const getAuthorAndProjectData = AllTicketsNotVisited.map((ticket) => {
        const project = projects.findIndex(
          (project) => project.id == ticket.project.id
        );

        const author = users.users.findIndex(
          (user) => user.uuid == ticket.author.id
        );

        if (project !== -1 && author !== -1) {
          return Object.assign(
            { ...ticket },
            {
              project: { ...projects[project] },
              author: { ...users.users[author] },
            }
          );
        } else {
          setError("Something Went Wrong While Loading New Tickets");
          setLoading(false);
        }
      });

      const ticketsNotVisited = getAuthorAndProjectData.filter(
        (ticket) =>
          ticket?.project.members.findIndex(
            (member) => member.uuid == auth.user.uuid
          ) !== -1 || ticket.project.manager.uuid == auth.user.uuid
      );

      if (ticketsNotVisited.length > 0 && ticketsNotVisited[0] !== undefined) {
        setTickets(ticketsNotVisited);
        setError(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError("No Tickets Yet?!");
    }
  }, [actions.data, auth.user, projects, reduxTickets.data, users.users]);

  return { tickets, loading, error };
};

export default useGetNotVisitedTickets;
