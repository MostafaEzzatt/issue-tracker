import { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";
import filterPinnedProjects from "../util/filterPinnedProjects";

const useGetPinnedProjects = () => {
  const [pinnedProjects, setPinnedProjects] = useState([]);
  const [pinnedProjectsLoading, setPinnedProjectsLoading] = useState(true);
  const [pinnedProjectsError, setPinnedProjectsError] = useState(null);
  const actions = useSelector((state) => state.actions);
  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    if (actions.data.length > 0) {
      const filteredPinnedProjects = filterPinnedProjects(actions.data);

      if (filteredPinnedProjects.length > 0 && projects.data.length > 0) {
        const getProjectsContent = projects.data.filter(
          (project) =>
            filteredPinnedProjects.findIndex(
              (filteredProject) => filteredProject.action.id == project.id
            ) !== -1
        );

        setPinnedProjects(getProjectsContent);
        setPinnedProjectsLoading(false);
        setPinnedProjectsError(null);
      } else {
        setPinnedProjectsError("No Projects Yet?!");
        setPinnedProjectsLoading(false);
      }
    } else {
      setPinnedProjectsError("No Projects Yet?!");
      setPinnedProjectsLoading(false);
    }
  }, [actions, projects]);

  return { pinnedProjects, pinnedProjectsLoading, pinnedProjectsError };
};

export default useGetPinnedProjects;
