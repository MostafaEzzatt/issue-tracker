const Textarea = ({ label, error, value, handleChange }) => {
  return (
    <>
      <label className="block text-sm font-medium">
        {label}

        <textarea
          value={value}
          onChange={handleChange}
          className="border-alto bg-silver text-cod-gray mt-2.5 block w-full
        rounded border border-solid py-2.5 pl-2.5"
        ></textarea>
      </label>
      <div className="text-cod-gray mt-1 rounded bg-red-100 px-2.5 font-medium">
        {error}
      </div>
    </>
  );
};

export default Textarea;
