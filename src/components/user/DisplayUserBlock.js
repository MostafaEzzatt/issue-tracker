import React from "react";

const DisplayUserBlock = ({ user }) => {
  return (
    <div className="col-span-2 p-10px shadow-sm hover:shadow-md cursor-pointer bg-white flex justify-between font-semibold capitalize">
      {user.displayName}
    </div>
  );
};

export default DisplayUserBlock;
