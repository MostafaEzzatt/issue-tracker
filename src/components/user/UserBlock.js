import Plus from "../../assets/plus.svg";
import Minus from "../../assets/minus.svg";

import addRemoveUserFromList from "../../util/addRemoveUserFromList";

const UserBlock = ({ usersList, setUsersList, user }) => {
  return (
    <div className="col-span-12 flex cursor-pointer justify-between bg-white p-2.5 shadow-sm hover:shadow-md md:col-span-6 xl:col-span-4">
      {user.displayName}

      <button
        className={`px-1 py-1 ${
          usersList?.includes(user.uuid)
            ? "bg-red-400 hover:bg-red-600"
            : "bg-dodger-blue hover:bg-moody-blue"
        } flex items-center justify-center rounded text-white transition-colors`}
        onClick={() =>
          addRemoveUserFromList(user.uuid, usersList, setUsersList)
        }
      >
        {usersList?.includes(user.uuid) ? (
          <Minus className="h-5 w-5" />
        ) : (
          <Plus className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default UserBlock;
