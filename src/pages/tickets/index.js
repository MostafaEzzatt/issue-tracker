import { useEffect, useState } from "react";
import Link from "next/link";

// Components
import Layout from "../../components/layout";
import TicketCard from "../../components/ticket/TicketCard";
import ContentGrid from "../../components/ContentGrid";
import Loading from "../../components/layout/Loading";
import DropdownInput from "../../components/form/DropdownInput";

// Assets
import Plus from "../../assets/plus.svg";

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
        <div className="text-scorpion mr-2.5 bg-white py-6 text-center font-bold shadow-sm">
          {error}
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex flex-col gap-4 px-3 md:flex-row md:justify-between">
        <div className="flex flex-col gap-1.5 md:flex-row md:items-center">
          <span className="text-scorpion font-medium">Filter By Project:</span>
          <DropdownInput
            list={projectList}
            setData={setProjectFilter}
            field={"title"}
            idField="id"
          />
        </div>

        <Link href="/tickets/new">
          <a className="">
            <div className="text-dodger-blue hover:text-moody-blue h-6 w-full rounded bg-white shadow-sm transition-all duration-200 hover:shadow-lg md:w-6">
              <Plus className="mx-auto h-6 w-6" />
            </div>
          </a>
        </Link>
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
