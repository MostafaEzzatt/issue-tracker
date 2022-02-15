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
      className={`group group-hover:border-cod-gray relative flex w-full cursor-pointer justify-between border-b border-solid py-1.5 md:w-44 ${
        isOpen ? "border-dodger-blue" : "border-scorpion"
      }`}
      onClick={() => setIsOpen(!isOpen)}
      ref={menuRef}
    >
      <span className="text-scorpion">{selected}</span>
      <ArrowDown className="text-scorpion group-hover:text-cod-gray pointer-events-none h-5 w-5" />
      <div
        className={`${
          isOpen ? "absolute" : "hidden"
        } bg-silver top-full left-0 right-0 mt-2.5 rounded py-1 shadow-md`}
      >
        {list.length > 0 ? (
          <ul className="divide-y">
            {list.map((item) => (
              <li
                className="hover:bg-dodger-blue hover:text-silver break-words py-3 px-1.5 font-medium transition-colors"
                key={item[idField]}
                onClick={() => handleClick(item)}
              >
                {item[field]}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-scorpion py-3 text-center font-bold">
            There Is Not Managers Yet
          </p>
        )}
      </div>
    </div>
  );
};

export default DropdownInput;
