import Loading from "../../assets/loading.svg";

const LoadingBlock = () => {
  return (
    <div className="w-full bg-white p-2.5 drop-shadow-sm">
      <Loading className="mx-auto h-7 w-7" />
    </div>
  );
};

export default LoadingBlock;
