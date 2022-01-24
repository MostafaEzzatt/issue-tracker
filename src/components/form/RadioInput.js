import React from "react";

const RadioInput = ({ list, prefix, store, checked }) => {
  return (
    <div className="space-x-2">
      {list.map((item) => (
        <label key={item} className="space-x-1">
          <input
            type="radio"
            name={prefix}
            value={item}
            className="align-middle"
            onChange={(e) => store(e.target.value)}
            checked={checked == item ? item : ""}
          />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioInput;
