import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// Components
import Layout from "../../../components/layout";
import Stamp from "../../../components/ticket/Stamp";
import SectionTitle from "../../../components/SectionTitle";
import ContentGrid from "../../../components/ContentGrid";
import DisplayUserBlock from "../../../components/user/DisplayUserBlock";
import Loading from "../../../components/layout/Loading";
import ErrorBlock from "../../../components/shared/ErrorBlock";
import TicketCard from "../../../components/ticket/TicketCard";

// Custome Hooks
import useGetProject from "../../../hooks/useGetProject";
import useGetProjectTickets from "../../../hooks/useGetProjectTickets";

// Assets
import Pencil from "../../../assets/pen.svg";
import PaperClip from "../../../assets/paperClip.svg";

// Redux
import { useSelector } from "react-redux";

// Util
import checkMemberInProject from "../../../util/checkMemberInProject";
import filterPinnedProjects from "../../../util/filterPinnedProjects";
import pinProject from "../../../util/pinProject";
import checkIfProjectPinned from "../../../util/checkIfProjectPinned";
import ProjectMenu from "../../../components/project/ProjectMenu";

const SingleProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const { project, loading: projectLoading, error } = useGetProject(id);
  const {
    tickets,
    loading: ticketsIsLoading,
    error: TicketsError,
  } = useGetProjectTickets(id);
  const auth = useSelector((state) => state.auth);
  const actions = useSelector((state) => state.actions);
  const [loading, setLoading] = useState(true);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (project && auth.isLoggedIn) {
      if (checkMemberInProject(auth, project)) {
        setLoading(false);
      } else {
        Router.push("/project");
      }
    }
  }, [project, auth]);

  useEffect(() => {
    const filteredPinnedProjects = filterPinnedProjects(actions.data);
    if (filteredPinnedProjects.length > 0) {
      const checkIfPinned = checkIfProjectPinned(id, filteredPinnedProjects);
      setIsPinned(checkIfPinned);
    } else {
      setIsPinned(false);
    }
  }, [actions, id]);

  const handlePinProject = () => {
    const pinnedProjectsList = filterPinnedProjects(actions.data);
    pinProject(id, pinnedProjectsList, auth);
  };

  if (loading || projectLoading || ticketsIsLoading || router.isFallback)
    return <Loading />;
  if (!loading && !projectLoading && !ticketsIsLoading && error)
    return (
      <Layout>
        <ErrorBlock message={error} />
      </Layout>
    );

  return (
    <Layout>
      <div className="px-3">
        <div className="mb-2.5 flex gap-x-2 pb-2.5">
          {/* <!-- Logo --> */}
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            {project.icon ? (
              <Image
                src={project.icon}
                width={50}
                height={50}
                alt={project.title}
                objectFit="cover"
                objectPosition="center"
              />
            ) : (
              <FakeIcon />
            )}
          </div>

          {/* <!-- Meta --> */}
          <div className="flex-auto">
            <h4 className="text-lg font-semibold">{project.title}</h4>
            <div className="mt-1 flex flex-col gap-1 text-xs text-[#BBBBBB] md:flex-row">
              <div>Manager : {project.manager.displayName}</div>
            </div>
          </div>

          {/* <!-- Menu --> */}

          <ProjectMenu id={id} />
        </div>

        {/* <!-- Time And State --> */}
        <div className="mb-4 flex flex-col gap-2 text-[#606060] md:flex-row">
          <div>
            <span className="text-[#5D92FF]">@</span> 10:30 |{" "}
            {project.createdAt}
          </div>
          <div>
            <span className="text-[#5D92FF]">Time Estimate</span> :{" "}
            {project.endAt}
          </div>
          <div>
            <span
              className={`inline-block h-7 w-16 rounded text-center text-sm capitalize leading-7 text-white ${project.state}`}
            >
              {project.state}
            </span>
          </div>
        </div>
      </div>
      <p className="mb-8 px-3 text-[#606060]">{project.description}</p>

      <h3 className="mb-4 px-3 text-2xl font-bold">Members</h3>

      {/* <!-- Members List --> */}
      <ul className="mb-8 grid grid-cols-12 gap-2.5 px-3">
        {project.members.length &&
          project.members.map((user) => (
            <>
              {/* <!-- List Item --> */}
              <li
                className="col-span-12 md:col-span-6 xl:col-span-4"
                key={user.uuid}
              >
                <div className="rounded bg-white py-2.5 px-3 font-medium">
                  {user.displayName}
                </div>
              </li>
            </>
          ))}
      </ul>

      <h3 className="mb-4 px-3 text-2xl font-bold">Tickets</h3>
      {/* <!-- item --> */}
      {tickets.length > 0 ? (
        <ContentGrid>
          {tickets.map((ticket) => (
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
      ) : (
        <div className="text-scorpion mx-3 mt-2.5 w-full bg-white py-6 text-center font-bold shadow-sm">
          {TicketsError}
        </div>
      )}
    </Layout>
  );
};

const FakeIcon = () => {
  return <div className="h-[50px] w-[50px] rounded-full bg-white"></div>;
};

export default SingleProject;
