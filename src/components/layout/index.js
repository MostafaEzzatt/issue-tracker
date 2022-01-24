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
        className={`w-full h-screen relative grid xl:grid-cols-12 md:grid-cols-9 sm:grid-cols-6 grid-cols-2 gap-[10px] ${
          toggleNav && "max-h-screen overflow-hidden"
        }`}
      >
        <button
          className="absolute left-0 top-10px bg-white shadow-sm cursor-pointer visible sm:hidden z-50"
          onClick={() => setToggleNav(!toggleNav)}
        >
          {toggleNav ? (
            <Close className="w-6 h-6" />
          ) : (
            <ArrowRight className="w-6 h-6" />
          )}
        </button>
        <div
          className={`md:col-span-3 col-span-2 w-full z-40 absolute sm:static top-0 ${
            toggleNav ? "left-0" : "-left-full"
          } transition-all`}
        >
          <Nav />
        </div>
        <div className="col-span-2 sm sm:col-span-4 md:col-span-6 xl:col-span-9 pt-8 ml-10px sm:ml-0">
          {children}
        </div>
      </div>
    </Authorized>
  );
};

export default Layout;
