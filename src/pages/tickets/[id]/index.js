import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Assets
import Pencil from "../../../assets/pen.svg";

// Components
import Layout from "../../../components/layout";
import Loading from "../../../components/layout/Loading";
import SectionTitle from "../../../components/SectionTitle";
import ContentGrid from "../../../components/ContentGrid";
import DisplayUserBlock from "../../../components/user/DisplayUserBlock";
import Comments from "../../../components/ticket/Comments";
import ErrorBlock from "../../../components/shared/ErrorBlock";

// Custom Hooks
import useGetTicket from "../../../hooks/useGetTicket";
import useGetAllProjects from "../../../hooks/useGetAllProjects";
import useUserVisitedTicketAction from "../../../hooks/useUserVisitedTicketAction";

// Util
import checkUserInProjectTicket from "../../../util/checkUserInProjectTicket";

// Redux
import { useSelector } from "react-redux";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { ticket, loading, error } = useGetTicket(id);
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useGetAllProjects();
  const auth = useSelector((state) => state.auth);
  const [showError, setShowError] = useState(false);
  const actions = useSelector((state) => state.actions);
  const visited = useUserVisitedTicketAction();

  useEffect(() => {
    if (ticket && projects.length > 0 && !projectsLoading && !showError) {
      const userInTicket = checkUserInProjectTicket(
        auth,
        ticket.project.id,
        projects
      );
      setShowError(true);

      if (userInTicket) {
        const checkIfAlreadyVisited = actions.data.findIndex(
          (action) => action.id == `${ticket.id}_${auth.user.uuid}_ticket`
        );

        if (checkIfAlreadyVisited == -1) {
          visited(ticket, auth);
        }
      }
    }
  }, [ticket, projects, projectsLoading, actions]);

  if (!router.isFallback) {
    return <Loading />;
  }

  if (loading && !error) return <Loading />;
  if (!loading && error)
    return (
      <Layout>
        <ErrorBlock message={error} />
      </Layout>
    );

  return (
    <Layout>
      <div className="mr-10px relative">
        {auth.user.role == "manager" ||
        ticket.author.uuid == auth.user.uuid ||
        auth.user.role == "admin" ? (
          <div className="-right-10px absolute -top-8 flex h-8 w-8 items-center justify-center rounded-bl bg-green-500 shadow-sm transition-all hover:bg-green-600 hover:shadow-md">
            <Link href={`${id}/edit`}>
              <a className="cursor-pointer text-white">
                <Pencil className="h-6 w-6" />
              </a>
            </Link>
          </div>
        ) : (
          ""
        )}

        <h3 className="text-title text-cod-gray break-words font-semibold">
          {ticket.title}
        </h3>

        <div className="mt-10px mb-5">
          <span className="text-dodger-blue">Assigned By: </span>
          {ticket.author.displayName}
        </div>

        <p className="text-scorpion text-sm sm:text-base">
          {ticket.description}
        </p>

        {ticket.assignedTo.length > 0 && (
          <>
            <SectionTitle title="Assigned To" />
            <ContentGrid>
              {ticket.assignedTo.map((user) => (
                <DisplayUserBlock user={user} key={user.uuid} />
              ))}
            </ContentGrid>
          </>
        )}

        <Comments ticketId={id} />
      </div>
    </Layout>
  );
};

export default Index;
