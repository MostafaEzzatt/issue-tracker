import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

// Custome Hooks
import useGetProject from "../../../hooks/useGetProject";
import useGetProjectTickets from "../../../hooks/useGetProjectTickets";

// Assets
import Pencil from "../../../assets/pen.svg";
import TicketCard from "../../../components/ticket/TicketCard";

// Redux
import { useSelector } from "react-redux";

// Util
import checkMemberInProject from "../../../util/checkMemberInProject";

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
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    if (project && auth && showToast) {
      if (checkMemberInProject(auth, project)) {
        setLoading(false);
      } else {
        setShowToast(false);
      }
    }
  }, [project, auth]);

  if (loading || projectLoading || ticketsIsLoading) return <Loading />;
  if (!loading && !projectLoading && !ticketsIsLoading && error)
    return (
      <Layout>
        <ErrorBlock message={error} />
      </Layout>
    );

  return (
    <Layout>
      <div className="mr-10 relative">
        {auth.user.role !== "member" && (
          <div className="absolute -top-8 -right-10 w-8 h-8 rounded-bl bg-green-500 hover:bg-green-600 shadow-sm hover:shadow-md transition-all flex justify-center items-center">
            <Link href={`${id}/edit`}>
              <a className="text-white cursor-pointer">
                <Pencil className="w-6 h-6" />
              </a>
            </Link>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-2 max-w-full">
          {project.icon && (
            <Image
              src={project?.icon}
              alt={project.title}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <h3 className="text-title font-semibold flex-auto break-words w-titleWidth">
            {project.title}
          </h3>
          <Stamp type={project.state} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
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

        <p className="text-sm text-scorpion mt-5 mb-4 md:text-base">
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
          <div className="mt-10px w-full text-scorpion bg-white shadow-sm text-center py-6 font-bold">
            {TicketsError}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SingleProject;
