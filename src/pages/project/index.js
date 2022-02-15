import Link from "next/link";
import { useEffect, useState } from "react";

// Components
import Layout from "../../components/layout";
import ContentList from "../../components/ContentList";
import ProjectCard from "../../components/project/ProjectCard";

// Assets
import Plus from "../../assets/plus.svg";

// Custom Hooks
import useGetAllProjects from "../../hooks/useGetAllProjects";

// Redux
import { useSelector } from "react-redux";

// Util
import getMemberProjects from "../../util/getMemberProjects";
import getManagerProjects from "../../util/getManagerProjects";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { projects: fetchProjects, loading, error } = useGetAllProjects();

  useEffect(() => {
    if (!loading && !error) {
      if (auth.user.role == "member") {
        setProjects(getMemberProjects(auth, fetchProjects));
      } else if (auth.user.role == "manager") {
        setProjects(getManagerProjects(auth, fetchProjects));
      } else if (auth.user.role == "admin") {
        setProjects(fetchProjects);
      }
    }
  }, [auth, fetchProjects]);

  return (
    <Layout>
      <div className="px-3">
        <div className="mb-4 flex justify-end">
          <Link href="/project/new">
            <a className="w-full md:w-6">
              <div className="text-dodger-blue hover:text-moody-blue h-6 w-full rounded bg-white shadow-sm transition-all duration-200 hover:shadow-lg md:w-6">
                <Plus className="mx-auto h-6 w-6" />
              </div>
            </a>
          </Link>
        </div>
        <ContentList>
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                img={project?.icon}
                title={project.title}
                manager={project.manager.uuid}
                description={project.description}
                state={project.state}
              />
            ))}
        </ContentList>
      </div>
    </Layout>
  );
};

export default Project;
