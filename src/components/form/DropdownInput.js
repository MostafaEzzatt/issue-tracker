import { useState, useEffect, useRef } from "react";

// Assets
import ArrowDown from "../../assets/arrowDown.svg";

const DropdownInput = ({ list, setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Choose The Manager");
  const [managers, setManagers] = useState([]);
  const menuRef = useRef();

  useEffect(() => {
    let managers = list.filter((user) => user.role == "manager");
    setManagers(managers);
  }, [list]);

  useEffect(() => {
    const handleWindowClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleClick = (manager) => {
    setSelected(manager.displayName);
    setData(manager);
  };

  return (
    <div
      className="border border-scorpion rounded py-3 px-3 mt-10px flex justify-between group group-hover:border-cod-gray cursor-pointer relative"
      onClick={() => setIsOpen(!isOpen)}
      ref={menuRef}
    >
      <span>{selected}</span>
      <ArrowDown className="w-5 h-5 text-scorpion group-hover:text-cod-gray pointer-events-none" />
      <div
        className={`${
          isOpen ? "absolute" : "hidden"
        } top-full left-0 right-0 rounded py-1 px-1 mt-10px bg-silver shadow-md`}
      >
        {managers.length > 0 ? (
          <ul className="divide-y">
            {managers.map((manager) => (
              <li
                className="py-3 hover:bg-dodger-blue hover:text-silver font-medium transition-colors px-3"
                key={manager.uuid}
                onClick={() => handleClick(manager)}
              >
                {manager.displayName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-scorpion font-bold text-center py-3">
            There Is Not Managers Yet
          </p>
        )}
      </div>
    </div>
  );
};

export default DropdownInput;
