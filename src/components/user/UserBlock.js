import Plus from "../../assets/plus.svg";
import Minus from "../../assets/minus.svg";

import addRemoveUserFromList from "../../util/addRemoveUserFromList";

const UserBlock = ({ usersList, setUsersList, user }) => {
  return (
    <div className="col-span-2 p-10px shadow-sm hover:shadow-md cursor-pointer bg-white flex justify-between">
      {user.displayName}

      <button
        className={`px-1 py-1 ${
          usersList?.includes(user.uuid)
            ? "bg-red-400 hover:bg-red-600"
            : "bg-dodger-blue hover:bg-moody-blue"
        } transition-colors rounded flex justify-center items-center text-white`}
        onClick={() =>
          addRemoveUserFromList(user.uuid, usersList, setUsersList)
        }
      >
        {usersList?.includes(user.uuid) ? (
          <Minus className="w-5 h-5" />
        ) : (
          <Plus className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default UserBlock;
