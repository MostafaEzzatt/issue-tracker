import Router from "next/router";
import { toast } from "react-toastify";

const checkIfAdmin = (auth) => {
  if (auth.user.role !== "admin") {
    toast.info("Admin Only Can Do This");
    Router.push("/dashboard");
  }
};

export default checkIfAdmin;
