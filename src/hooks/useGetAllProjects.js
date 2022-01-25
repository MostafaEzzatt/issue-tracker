import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

const useGetAllProjects = () => {
  const [projects, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reduxProjects = useSelector((state) => state.projects);
  const reduxUser = useSelector((state) => state.users);

  useEffect(() => {
    if (reduxProjects.data.length > 0) {
      const tempProjects = reduxProjects.data.map((project) => {
        const tempMembers = reduxUser.users.filter(
          (user) =>
            project.members.findIndex((member) => member.id == user.uuid) !== -1
        );

        const tempManager = reduxUser.users.filter(
          (user) => user.uuid == project.manager.id
        );

        return Object.assign(
          { ...project },
          { members: tempMembers, manager: tempManager[0] }
        );
      });

      setProject(tempProjects);

      setLoading(false);
      setError(null);
    } else {
      setLoading(false);
      setError("There Is no Projects Yet");
    }
  }, [reduxProjects, reduxUser]);

  return { projects, loading, error };
};

export default useGetAllProjects;
