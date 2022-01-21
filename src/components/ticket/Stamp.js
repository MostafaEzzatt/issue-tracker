const Stamp = ({ type }) => {
  return (
    <div
      className={`px-2 py-[3px] capitalize max-w-max rounded-full text-xs font-medium ${type}`}
    >
      {type}
    </div>
  );
};

export default Stamp;
