import React from "react";

const DateInput = ({ label, error, value, min, handleChange }) => {
  return (
    <>
      <label className="font-medium text-sm block">
        {label}

        <input
          type="date"
          value={value}
          min={min}
          onChange={handleChange}
          className="block mt-10px"
        />
      </label>
      <div className="bg-red-100 font-medium mt-1 rounded px-10px text-cod-gray">
        {error}
      </div>
    </>
  );
};

export default DateInput;
