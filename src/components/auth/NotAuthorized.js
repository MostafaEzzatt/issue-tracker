import { useState, useEffect } from "react";
import Router from "next/router";

// Redux
import { useSelector } from "react-redux";

const NotAuthorized = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (auth.isLoggedIn && !auth.isLoading) Router.push("/dashboard");
  if (!auth.isLoggedIn && !auth.isLoading) return children;

  return "";
};

export default NotAuthorized;
