const PasswordInput = ({ label, error, value, handleChange }) => {
  return (
    <>
      <label className="block text-sm font-medium">
        {label}
        <input
          type="password"
          className="mt-10px block w-full rounded border border-solid border-alto bg-silver py-10px pl-10px text-cod-gray"
          value={value}
          onChange={handleChange}
        />
      </label>
      <div className="mt-1 rounded bg-red-100 px-10px font-medium text-cod-gray">
        {error}
      </div>
    </>
  );
};

export default PasswordInput;
