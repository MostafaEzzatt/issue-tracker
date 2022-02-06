import React from "react";

const ContentGrid = ({ children }) => {
  return (
    <div className="mr-10px mt-4 grid max-w-full grid-cols-2 gap-x-[10px] gap-y-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6">
      {children}
    </div>
  );
};

export default ContentGrid;
