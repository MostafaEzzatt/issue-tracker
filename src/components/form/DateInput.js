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
          className="mt-10px block"
        />
      </label>
      <div className="mt-1 rounded bg-red-100 px-10px font-medium text-cod-gray">
        {error}
      </div>
    </>
  );
};

export default DateInput;
