import React from "react";

const DateInput = ({ label, error, value, min, handleChange }) => {
  return (
    <>
      <label className="block text-sm font-medium">
        {label}

        <input
          type="date"
          value={value}
          min={min}
          onChange={handleChange}
          className="mt-2.5 block"
        />
      </label>
      <div className="text-cod-gray mt-1 rounded bg-red-100 px-2.5 font-medium">
        {error}
      </div>
    </>
  );
};

export default DateInput;
