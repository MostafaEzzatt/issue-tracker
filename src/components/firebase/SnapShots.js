// Custom Hooks
import useProjectsSnapShot from "../../hooks/useProjectsSnapShot";
import useTicketsSnapShot from "../../hooks/useTicketsSnapShot";

const SnapShots = ({ children }) => {
  useProjectsSnapShot();
  useTicketsSnapShot();
  return children;
};

export default SnapShots;
