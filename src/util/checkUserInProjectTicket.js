import Router from "next/router";
import { toast } from "react-toastify";
import getManagerProjects from "./getManagerProjects";

const checkUserInProjectTicket = (auth, projectId, projects) => {
  const getProject = projects.filter((project) => project.id == projectId);
  const checkIfMember = getManagerProjects(auth, getProject);

  if (checkIfMember.length == 0 && auth.user.role !== "admin") {
    toast.info("You Can't See This Ticket", { toastId: "Access Warning" });
    Router.push("/tickets");
    return false;
  }

  return true;
};

export default checkUserInProjectTicket;
