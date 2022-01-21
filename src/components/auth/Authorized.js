import Router from "next/router";

//Redux
import { useSelector } from "react-redux";

const Authorized = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isLoggedIn && !auth.isLoading) Router.push("/");

  return children;
};

export default Authorized;
