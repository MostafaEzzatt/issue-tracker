const PasswordInput = ({ label, error, value, handleChange }) => {
  return (
    <>
      <label className="font-medium text-sm block">
        {label}
        <input
          type="password"
          className="bg-silver border border-solid block border-alto rounded w-full py-10px text-cod-gray pl-10px mt-10px"
          value={value}
          onChange={handleChange}
        />
      </label>
      <div className="bg-red-100 font-medium mt-1 rounded px-10px text-cod-gray">
        {error}
      </div>
    </>
  );
};

export default PasswordInput;
