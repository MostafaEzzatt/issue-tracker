import React from "react";

const DisplayUserBlock = ({ user }) => {
  return (
    <div className="col-span-2 flex cursor-pointer justify-between bg-white p-2.5 font-semibold capitalize shadow-sm hover:shadow-md">
      {user.displayName}
    </div>
  );
};

export default DisplayUserBlock;
