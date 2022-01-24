const ErrorBlock = ({ message }) => {
  return (
    <div className="w-full bg-white p-10px drop-shadow-sm text-red-400 text-center">
      {message}
    </div>
  );
};

export default ErrorBlock;
