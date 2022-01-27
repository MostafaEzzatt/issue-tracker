// Custom Hooks
import useCommentsSnapShot from "../../hooks/useCommentSnapShot";
import useProjectsSnapShot from "../../hooks/useProjectsSnapShot";
import useTicketsSnapShot from "../../hooks/useTicketsSnapShot";
import useActionsSnapShot from "../../hooks/useActionsSnapShot";

const SnapShots = ({ children }) => {
  useProjectsSnapShot();
  useTicketsSnapShot();
  useCommentsSnapShot();
  useActionsSnapShot();

  return children;
};

export default SnapShots;
