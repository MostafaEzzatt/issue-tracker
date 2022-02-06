import { useState } from "react";

// Toast Css

// Components
import Nav from "./Nav";

// Auth Check Comp
import Authorized from "../auth/Authorized";

// Aassets
import ArrowRight from "../../assets/arrowRight.svg";
import Close from "../../assets/close.svg";

const Layout = ({ children }) => {
  const [toggleNav, setToggleNav] = useState(false);

  return (
    <Authorized>
      <div
        className={`relative grid h-screen w-full grid-cols-2 gap-[10px] sm:grid-cols-6 md:grid-cols-9 xl:grid-cols-12 ${
          toggleNav && "max-h-screen overflow-hidden"
        }`}
      >
        <button
          className="visible absolute top-10px left-0 z-50 cursor-pointer bg-white shadow-sm sm:hidden"
          onClick={() => setToggleNav(!toggleNav)}
        >
          {toggleNav ? (
            <Close className="h-6 w-6" />
          ) : (
            <ArrowRight className="h-6 w-6" />
          )}
        </button>
        <div
          className={`absolute top-0 z-40 col-span-2 w-full sm:static md:col-span-3 ${
            toggleNav ? "left-0" : "-left-full"
          } transition-all`}
        >
          <Nav />
        </div>
        <div className="sm col-span-2 ml-10px pt-8 sm:col-span-4 sm:ml-0 md:col-span-6 xl:col-span-9">
          {children}
        </div>
      </div>
    </Authorized>
  );
};

export default Layout;
