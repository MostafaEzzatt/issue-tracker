const Textarea = ({ label, error, value, handleChange }) => {
  return (
    <>
      <label className="font-medium text-sm block">
        {label}

        <textarea
          value={value}
          onChange={handleChange}
          className="bg-silver border border-solid block border-alto rounded
        w-full py-10px text-cod-gray pl-10px mt-10px"
        ></textarea>
      </label>
      <div className="bg-red-100 font-medium mt-1 rounded px-10px text-cod-gray">
        {error}
      </div>
    </>
  );
};

export default Textarea;
