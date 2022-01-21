import Link from "next/link";
import React from "react";

const LinkButton = ({ dist, txt }) => {
  return (
    <div className="w-full flex justify-center mt-4">
      <Link href={dist}>
        <a className="px-3 py-2 inline-block rounded-full text-sm font-semibold bg-moody-blue text-white">
          {txt}
        </a>
      </Link>
    </div>
  );
};

export default LinkButton;
