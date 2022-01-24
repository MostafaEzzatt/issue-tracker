import { route } from "next/dist/server/router";
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

// Custom Hooks
import useGetTicket from "../../../hooks/useGetTicket";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { ticket, loading, error } = useGetTicket(id);

  console.log(ticket);

  if (loading && !error) return <Loading />;
  if (!loading && error)
    return (
      <Layout>
        <div className="text-center text-scorpion font-bold">{error}</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="relative">
        <div className="absolute -top-8 right-0 w-8 h-8 rounded-bl bg-green-500 hover:bg-green-600 shadow-sm hover:shadow-md transition-all flex justify-center items-center">
          <Link href={`${id}/edit`}>
            <a className="text-white cursor-pointer">
              <Pencil className="w-6 h-6" />
            </a>
          </Link>
        </div>

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
      </div>
    </Layout>
  );
};

export default Index;
