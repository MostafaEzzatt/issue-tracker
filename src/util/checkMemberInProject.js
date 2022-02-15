import Router from "next/router";
import { toast } from "react-toastify";

const checkMemberInProject = (auth, project) => {
  if (auth.user.role == "admin") return true;
  const tempProjects =
    project.manager.uuid == auth.user.uuid ||
    project.members.findIndex((member) => member.uuid == auth.user.uuid) !== -1;

  if (!tempProjects && auth.user.role !== "admin") {
    toast.info("You Are Not Member Or Manager In This Project", {
      toastId: "Member or Manager Only Access Warnings",
    });
    Router.push("/dashboard");

    return false;
  }

  return true;
};

export default checkMemberInProject;
