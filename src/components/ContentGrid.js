import React from "react";

const ContentGrid = ({ children }) => {
  return (
    <div className="mt-4 grid max-w-full grid-cols-12 gap-4 px-3">
      {children}
    </div>
  );
};

export default ContentGrid;
