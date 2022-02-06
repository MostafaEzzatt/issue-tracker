const ErrorBlock = ({ message }) => {
  return (
    <div className="w-full bg-white p-10px text-center text-red-400 drop-shadow-sm">
      {message}
    </div>
  );
};

export default ErrorBlock;
