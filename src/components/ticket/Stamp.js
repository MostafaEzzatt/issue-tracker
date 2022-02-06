const Stamp = ({ type }) => {
  return (
    <div
      className={`max-w-max rounded-full px-2 py-[3px] text-xs font-medium capitalize ${type}`}
    >
      {type}
    </div>
  );
};

export default Stamp;
