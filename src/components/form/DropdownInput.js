import { useState, useEffect, useRef } from "react";

// Assets
import ArrowDown from "../../assets/arrowDown.svg";

const DropdownInput = ({
  list,
  setData,
  field,
  idField,
  selectedInput = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Choose From The List");
  const menuRef = useRef();

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

  useEffect(() => {
    if (selectedInput) {
      setSelected(selectedInput);
    }
  }, [selectedInput]);

  const handleClick = (manager) => {
    setSelected(manager[field]);
    setData(manager);
  };

  return (
    <div
      className="border border-scorpion rounded py-3 px-3 mt-10px flex justify-between group group-hover:border-cod-gray cursor-pointer relative w-full"
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
        {list.length > 0 ? (
          <ul className="divide-y">
            {list.map((item) => (
              <li
                className="py-3 hover:bg-dodger-blue hover:text-silver font-medium transition-colors px-3 break-words"
                key={item[idField]}
                onClick={() => handleClick(item)}
              >
                {item[field]}
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
