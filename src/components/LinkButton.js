import Link from "next/link";
import React from "react";

const LinkButton = ({ dist, txt }) => {
  return (
    <div className="mt-4 flex w-full justify-center">
      <Link href={dist}>
        <a className="inline-block rounded-full bg-moody-blue px-3 py-2 text-sm font-semibold text-white">
          {txt}
        </a>
      </Link>
    </div>
  );
};

export default LinkButton;
