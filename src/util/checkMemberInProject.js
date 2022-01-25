import Router from "next/router";
import { toast } from "react-toastify";

const checkMemberInProject = (auth, project) => {
  if (auth.user.role == "admin") return;
  const tempProjects =
    project.manager.uuid == auth.user.uuid ||
    project.members.findIndex((member) => member.uuid == auth.user.uuid) !== -1;

  if (!tempProjects) {
    toast.info("You Are Not Member Or Manager In This Project");
    Router.push("/dashboard");
  }
};

export default checkMemberInProject;
