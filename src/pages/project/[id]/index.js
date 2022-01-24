import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// Components
import Layout from "../../../components/layout";
import Stamp from "../../../components/ticket/Stamp";
import SectionTitle from "../../../components/SectionTitle";
import ContentGrid from "../../../components/ContentGrid";
import DisplayUserBlock from "../../../components/user/DisplayUserBlock";

// Custome Hooks
import useGetProject from "../../../hooks/useGetProject";

// Assets
import Pencil from "../../../assets/pen.svg";

const SingleProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const { project, loading, error } = useGetProject(id);

  console.log(project);

  if (loading) return "loading";

  return (
    <Layout>
      <div className="mr-10 relative">
        <div className="absolute -top-8 -right-10 w-8 h-8 rounded-bl bg-green-500 hover:bg-green-600 shadow-sm hover:shadow-md transition-all flex justify-center items-center">
          <Link href={`${id}/edit`}>
            <a className="text-white cursor-pointer">
              <Pencil className="w-6 h-6" />
            </a>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {project.icon && (
            <Image
              src={project?.icon}
              alt={project.title}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <h3 className="text-title font-semibold">{project.title}</h3>
          <Stamp type="open" />
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

        <SectionTitle title="Manager" />
        <ContentGrid>
          {project.members.length &&
            project.members.map((user) => (
              <DisplayUserBlock key={user.uuid} user={user} />
            ))}
        </ContentGrid>
      </div>
    </Layout>
  );
};

export default SingleProject;
