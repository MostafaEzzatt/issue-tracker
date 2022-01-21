import React from "react";

const ContentGrid = ({ children }) => {
  return (
    <div className="max-w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6  gap-x-[10px] gap-y-2 mr-10px mt-4">
      {children}
    </div>
  );
};

export default ContentGrid;
