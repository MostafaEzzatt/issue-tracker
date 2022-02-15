const Stamp = ({ type }) => {
  return (
    <span
      className={`ml-1 rounded-full py-[2px] px-[6px] text-xs font-medium ${type}`}
    >
      {type}
    </span>
  );
};

export default Stamp;
