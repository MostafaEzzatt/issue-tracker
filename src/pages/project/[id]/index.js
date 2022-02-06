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
import { toast } from "react-toastify";

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
  const [showToast, setShowToast] = useState(true);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (project && auth && showToast) {
      if (checkMemberInProject(auth, project)) {
        setLoading(false);
      } else {
        setShowToast(true);
        Router.push("/project");
        toast("You Are Not Member Or Manager In This Project");
        setShowToast(false);
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

  if (loading || projectLoading || ticketsIsLoading) return <Loading />;
  if (!loading && !projectLoading && !ticketsIsLoading && error)
    return (
      <Layout>
        <ErrorBlock message={error} />
      </Layout>
    );

  if (!router.isFallback) {
    return <Loading />;
  }
  return (
    <Layout>
      <div className="relative mr-10">
        <div className="absolute -top-8 -right-10 flex items-center justify-center gap-2 rounded-bl">
          <button
            className={`h-8 w-8 ${
              isPinned
                ? "border-dodger-blue bg-dodger-blue text-silver hover:border-moody-blue hover:bg-moody-blue"
                : "border-alto bg-silver text-cod-gray hover:bg-alto"
            }  border border-solid transition-colors `}
            onClick={handlePinProject}
          >
            <PaperClip className="mx-auto h-5 w-5" />
          </button>

          {auth.user.role !== "member" && (
            <Link href={`${id}/edit`}>
              <a className="flex h-8 w-8 cursor-pointer items-center justify-center bg-green-500 text-white shadow-sm transition-all hover:bg-green-600 hover:shadow-md">
                <Pencil className="h-6 w-6" />
              </a>
            </Link>
          )}
        </div>

        <div className="flex max-w-full flex-col items-center gap-2 sm:flex-row">
          {project.icon && (
            <Image
              src={project?.icon}
              alt={project.title}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <h3 className="w-titleWidth text-title flex-auto break-words font-semibold">
            {project.title}
          </h3>
          <Stamp type={project.state} />
        </div>

        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <span className="text-dodger-blue">@: </span> {project.createdAt}
          </div>
          <div>
            <span className="text-dodger-blue">Manager: </span>{" "}
            {project.manager.displayName}
          </div>
          <div>
            <span className="text-dodger-blue">Time Estimate: </span>{" "}
            {project.endAt}
          </div>
        </div>

        <p className="text-scorpion mt-5 mb-4 text-sm md:text-base">
          {project.description}
        </p>

        <SectionTitle title="Members" />
        <ContentGrid>
          {project.members.length &&
            project.members.map((user) => (
              <DisplayUserBlock key={user.uuid} user={user} />
            ))}
        </ContentGrid>

        <SectionTitle title="Tickets" />
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
          <div className="mt-10px text-scorpion w-full bg-white py-6 text-center font-bold shadow-sm">
            {TicketsError}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SingleProject;
