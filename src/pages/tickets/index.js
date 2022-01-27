import { useEffect, useState } from "react";

// Components
import Layout from "../../components/layout";
import TicketCard from "../../components/ticket/TicketCard";
import ContentGrid from "../../components/ContentGrid";
import Loading from "../../components/layout/Loading";
import DropdownInput from "../../components/form/DropdownInput";

// Redux
import { useSelector } from "react-redux";

// Custom Hooks
import useGetTickets from "../../hooks/useGetTickets";
import useGetAllProjects from "../../hooks/useGetAllProjects";

// Util
import getManagerProjects from "../../util/getManagerProjects";

const Tickets = () => {
  const { tickets, loading, error } = useGetTickets();
  const [filteredTickets, setFilteredTickets] = useState([]);
  const {
    projects,
    error: projectsErrors,
    loading: projectsLoading,
  } = useGetAllProjects();
  const [projectFilter, setProjectFilter] = useState({ title: "All" });
  const [projectList, setProjectList] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const tempTickets = tickets.filter(
      (ticket) =>
        projectList.findIndex((project) => project.id == ticket.project.id) !==
        -1
    );

    if (projectFilter.title == "All") {
      setFilteredTickets(tempTickets);
    } else {
      setFilteredTickets(
        tickets.filter((ticket) => ticket.project.id == projectFilter.id)
      );
    }
  }, [projectFilter, tickets, projectList]);

  useEffect(() => {
    if (!projectsLoading) {
      setProjectList([
        { id: "all", title: "All" },
        ...getManagerProjects(auth, projects),
      ]);
    }
  }, [projects]);

  if (loading || projectsLoading) return <Loading />;
  if (!loading && error)
    return (
      <Layout>
        <div className="bg-white mr-10px shadow-sm text-center font-bold py-6 text-scorpion">
          {error}
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="w-5/6 flex justify-center items-center gap-3 mx-auto">
        <span className="font-medium">Project</span>
        <DropdownInput
          list={projectList}
          setData={setProjectFilter}
          field={"title"}
          idField="id"
        />
      </div>
      <ContentGrid>
        {filteredTickets.length > 0 &&
          filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              description={ticket.description}
              priority={ticket.priority}
              assignedBy={ticket.author.displayName}
            />
          ))}
      </ContentGrid>
    </Layout>
  );
};

export default Tickets;
