// Custom Hooks
import useCommentsSnapShot from "../../hooks/useCommentSnapShot";
import useProjectsSnapShot from "../../hooks/useProjectsSnapShot";
import useTicketsSnapShot from "../../hooks/useTicketsSnapShot";

const SnapShots = ({ children }) => {
  useProjectsSnapShot();
  useTicketsSnapShot();
  useCommentsSnapShot();

  return children;
};

export default SnapShots;
