import Loading from "../../assets/loading.svg";

const LoadingBlock = () => {
  return (
    <div className="w-full bg-white p-10px drop-shadow-sm">
      <Loading className="w-7 h-7 mx-auto" />
    </div>
  );
};

export default LoadingBlock;
