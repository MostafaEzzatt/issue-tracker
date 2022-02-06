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
      className="group relative mt-10px flex w-full cursor-pointer justify-between rounded border border-scorpion py-3 px-3 group-hover:border-cod-gray"
      onClick={() => setIsOpen(!isOpen)}
      ref={menuRef}
    >
      <span>{selected}</span>
      <ArrowDown className="pointer-events-none h-5 w-5 text-scorpion group-hover:text-cod-gray" />
      <div
        className={`${
          isOpen ? "absolute" : "hidden"
        } top-full left-0 right-0 mt-10px rounded bg-silver py-1 px-1 shadow-md`}
      >
        {list.length > 0 ? (
          <ul className="divide-y">
            {list.map((item) => (
              <li
                className="break-words py-3 px-3 font-medium transition-colors hover:bg-dodger-blue hover:text-silver"
                key={item[idField]}
                onClick={() => handleClick(item)}
              >
                {item[field]}
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-3 text-center font-bold text-scorpion">
            There Is Not Managers Yet
          </p>
        )}
      </div>
    </div>
  );
};

export default DropdownInput;
