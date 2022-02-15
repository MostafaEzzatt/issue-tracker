import { useState, useRef, useEffect } from "react";
import Router from "next/router";

// Redux
import { useSelector } from "react-redux";

// Assets
import DotHorizontal from "../../assets/dotsHorizontal.svg";

// Util
import pinProject from "../../util/pinProject";
import filterPinnedProjects from "../../util/filterPinnedProjects";

const ProjectMenu = ({ id }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [pinnedProjects, setPinnedProjects] = useState(null);
  const actions = useSelector((states) => states.actions);
  const auth = useSelector((states) => states.auth);
  const menuRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    setPinnedProjects(filterPinnedProjects(actions.data));
  }, [actions.data]);

  useEffect(() => {
    if (pinnedProjects) {
      const checker = pinnedProjects.filter((data) => data.action.id == id);
      checker.length > 0 ? setIsPinned(true) : setIsPinned(false);
    }
  }, [id, pinnedProjects]);

  const handleProjectMenu = (e) => {
    e.preventDefault();
    setOpenMenu(!openMenu);
  };

  const handlePinProject = (e) => {
    e.preventDefault();
    pinProject(id, pinnedProjects, auth);
  };

  useEffect(() => {
    const handleWindowClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target) &&
        menuRef
      ) {
        setOpenMenu(false);
      }
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [menuRef]);

  useEffect(() => {
    setPinnedProjects(filterPinnedProjects(actions.data));
  }, [actions.data]);

  return (
    <div className="text-alto">
      <div className="relative cursor-pointer">
        <button onClick={handleProjectMenu} ref={buttonRef}>
          <DotHorizontal className="h-6 w-6" />
        </button>

        <div
          className={`absolute right-full top-full rounded bg-white px-2 py-1.5 shadow-md ${
            !openMenu && "hidden"
          }`}
          ref={menuRef}
        >
          <ul className="w-20 space-y-1.5">
            {isPinned !== null && (
              <li>
                <button
                  className={`${
                    isPinned ? "text-dodger-blue" : "text-scorpion"
                  } hover:text-dodger-blue block w-full py-0.5 text-left text-sm`}
                  onClick={handlePinProject}
                >
                  {isPinned ? "UnPin" : "Pin"}
                </button>
              </li>
            )}
            {auth.user.role !== "member" && (
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    Router.push(`/project/${id}/edit`);
                  }}
                  className="text-scorpion hover:text-dodger-blue block w-full py-0.5 text-left text-sm"
                >
                  Edit
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectMenu;
