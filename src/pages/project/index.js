// Components
import Layout from "../../components/layout";
import ContentList from "../../components/ContentList";
import ProjectCard from "../../components/project/ProjectCard";

//Redux
import { useSelector } from "react-redux";

const Project = () => {
  const projects = useSelector((state) => state.projects.data);

  return (
    <Layout>
      <ContentList>
        {projects?.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              img={project?.icon}
              title={project.title}
              startedAt={project.createdAt}
              manager={project.manager}
              description={project.description}
            />
          ))}
      </ContentList>
    </Layout>
  );
};

export default Project;
