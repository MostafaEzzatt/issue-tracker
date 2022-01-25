import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

//Util
import calcEstimatedDays from "../util/calcEstimatedDays";

const useGetProject = (id) => {
  const projects = useSelector((state) => state.projects.data);
  const users = useSelector((state) => state.users);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tempProject = projects.filter((data) => data.id == id);

    if (tempProject.length == 0) {
      setError("Cannot Find This Project");
      setLoading(false);
    } else {
      const managerId = tempProject[0].manager.id;
      const manager = users.users.filter((user) => user.uuid == managerId);
      const endAt = calcEstimatedDays(
        tempProject[0].createdAt,
        tempProject[0].timeEstimated
      );

      const members = users.users.filter(
        (user) =>
          tempProject[0].members.findIndex(
            (member) => member.id == user.uuid
          ) !== -1
      );

      setLoading(false);
      setError(false);
      setProject(
        Object.assign(
          { ...tempProject[0] },
          { manager: manager[0], endAt, members }
        )
      );
    }
  }, [projects, id]);

  return { project, loading, error };
};

export default useGetProject;
