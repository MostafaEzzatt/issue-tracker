import { useEffect, useState } from "react";

// Components
import Layout from "../../components/layout";
import ContentList from "../../components/ContentList";
import ProjectCard from "../../components/project/ProjectCard";

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
      <ContentList>
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              img={project?.icon}
              title={project.title}
              startedAt={project.createdAt}
              manager={project.manager}
              description={project.description}
              state={project.state}
            />
          ))}
      </ContentList>
    </Layout>
  );
};

export default Project;
