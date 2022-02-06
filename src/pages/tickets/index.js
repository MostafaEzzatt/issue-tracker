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
    const selectAllObject = { id: "all", title: "All" };

    if (!projectsLoading) {
      if (auth.user.role == "admin") {
        setProjectList([selectAllObject, ...projects]);
      } else {
        setProjectList([
          selectAllObject,
          ...getManagerProjects(auth, projects),
        ]);
      }
    }
  }, [projects]);

  if (loading || projectsLoading) return <Loading />;
  if (!loading && error)
    return (
      <Layout>
        <div className="mr-10px bg-white py-6 text-center font-bold text-scorpion shadow-sm">
          {error}
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="mx-auto flex w-5/6 items-center justify-center gap-3">
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
