import Router from "next/router";
import { toast } from "react-toastify";

const checkIfAdmin = (auth) => {
  if (auth.user.role !== "admin") {
    toast.info("Admin Only Can Do This", { toastId: "Admin Only Access" });
    Router.push("/dashboard");

    return false;
  }

  return true;
};

export default checkIfAdmin;
