import { useEffect, useState } from "react";
import Head from "next/head";

// Components
import Layout from "../components/layout";
import SectionTitle from "../components/SectionTitle";
import ContentGrid from "../components/ContentGrid";
import ProjectSmallCard from "../components/project/ProjectSmallCard";
import TicketCard from "../components/ticket/TicketCard";
import ContentList from "../components/ContentList";
import ProjectCard from "../components/project/ProjectCard";
import ErrorBlock from "../components/shared/ErrorBlock";

// Custom Hooks
import useGetAllProjects from "../hooks/useGetAllProjects";

// Redux
import { useSelector } from "react-redux";

// Util
import getMemberProjects from "../util/getMemberProjects";
import getManagerProjects from "../util/getManagerProjects";

export default function Dashboard() {
  const { projects, loading, error } = useGetAllProjects();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user.role == "member") {
      setFilteredProjects(getMemberProjects(auth, projects));
    } else if (auth.user.role == "manager") {
      setFilteredProjects(getManagerProjects(auth, projects));
    } else if (auth.user.role == "admin") {
      setFilteredProjects(projects);
    }
  }, [projects, auth]);

  return (
    <>
      <Head>
        <title>Issue Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <SectionTitle title="Pinned Project" />
        <ContentGrid>
          <ProjectSmallCard
            img="https://i.pravatar.cc/25"
            name="Redit"
            description="Reddit is a network of communities where people can dive into their
        interests, hobbies and passions. There's a community for whatever you're
        interested in on Reddit."
          />
        </ContentGrid>

        <SectionTitle title="New Tickets" />
        <ContentGrid>
          <TicketCard
            title="Problem With Creating New Post"
            description="Sed pretium, turpis justo viverra feugiat. Varius ut gravida pharetra
        turpis vulputate eget libero, eget bibendum."
            priority="normal"
            assignedBy="John Doe"
          />
          <TicketCard
            title="Posts Not Showing After Choosing Priority"
            description="Sed pretium, turpis justo viverra feugiat. Varius ut gravida pharetra
        turpis vulputate eget libero, eget bibendum."
            priority="critical"
            assignedBy="John Doe"
          />
        </ContentGrid>

        <SectionTitle title="Project" />
        <ContentList>
          {filteredProjects.length > 0 || !loading ? (
            filteredProjects
              .slice(0, 3)
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  img={project.icon}
                  title={project.title}
                  startedAt={project.createdAt}
                  manager={project.manager}
                  description={project.description}
                  state={project.state}
                />
              ))
          ) : (
            <ErrorBlock message={error} />
          )}
        </ContentList>
      </Layout>
    </>
  );
}
