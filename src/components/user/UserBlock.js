import Plus from "../../assets/plus.svg";
import Minus from "../../assets/minus.svg";

const UserBlock = ({ user, addRemove, onList }) => {
  return (
    <div className="col-span-2 p-10px shadow-sm hover:shadow-md cursor-pointer bg-white flex justify-between">
      {user.displayName}

      <button
        className={`px-1 py-1 ${
          onList
            ? "bg-red-400 hover:bg-red-600"
            : "bg-dodger-blue hover:bg-moody-blue"
        } transition-colors rounded flex justify-center items-center text-white`}
        onClick={() => addRemove(user.uuid)}
      >
        {onList ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default UserBlock;
