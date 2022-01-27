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

  if (loading && !error) return <Loading />;
  if (!loading && error)
    return (
      <Layout>
        <ErrorBlock message={error} />
      </Layout>
    );

  return (
    <Layout>
      <div className="relative mr-10px">
        {auth.user.role == "manager" || ticket.author.uuid == auth.user.uuid ? (
          <div className="absolute -top-8 -right-10px w-8 h-8 rounded-bl bg-green-500 hover:bg-green-600 shadow-sm hover:shadow-md transition-all flex justify-center items-center">
            <Link href={`${id}/edit`}>
              <a className="text-white cursor-pointer">
                <Pencil className="w-6 h-6" />
              </a>
            </Link>
          </div>
        ) : (
          ""
        )}

        <h3 className="text-title font-semibold text-cod-gray break-words">
          {ticket.title}
        </h3>

        <div className="mt-10px mb-5">
          <span className="text-dodger-blue">Assigned By: </span>
          {ticket.author.displayName}
        </div>

        <p className="text-sm sm:text-base text-scorpion">
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
