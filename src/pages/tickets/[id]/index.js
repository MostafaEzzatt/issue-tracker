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

  if ((loading && !error) || router.isFallback) return <Loading />;
  if (!loading && error)
    return (
      <Layout>
        <ErrorBlock message={error} />
      </Layout>
    );

  return (
    <Layout>
      <div className="px-3">
        <div className="flex items-center justify-between">
          <h3 className="text-cod-gray break-words text-4xl font-semibold">
            {ticket.title}
          </h3>

          {auth.user.role == "manager" ||
          ticket.author.uuid == auth.user.uuid ||
          auth.user.role == "admin" ? (
            <Link href={`${id}/edit`}>
              <a className="text-cod-gray cursor-pointer transition-colors hover:text-green-700">
                <Pencil className="h-6 w-6" />
              </a>
            </Link>
          ) : (
            ""
          )}
        </div>

        <div className="mt-2.5 mb-4">
          <span className="text-dodger-blue">Assigned By: </span>
          {ticket.author.displayName}
        </div>

        <p className="text-scorpion mb-8 text-sm sm:text-base">
          {ticket.description}
        </p>
      </div>

      {ticket.assignedTo.length > 0 && (
        <>
          <SectionTitle title="Assigned To" />
          <div className="px-3">
            <ul className="mb-8 grid grid-cols-12 gap-2.5">
              {ticket.assignedTo.map((user) => (
                <li
                  className="col-span-12 md:col-span-6 xl:col-span-4"
                  key={user.uuid}
                >
                  <div className="rounded bg-white py-2.5 px-3 font-medium">
                    {user.displayName}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="px-3">
        <Comments ticketId={id} />
      </div>
    </Layout>
  );
};

export default Index;
