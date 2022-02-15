import { useEffect, useRef } from "react";

const CommentItem = ({ user, time, content, idx, fullLength }) => {
  return (
    <li className="p-2.5">
      <div className="flex items-end gap-2">
        <h4 className="text-cod-gray font-semibold">{user.displayName}</h4>
        <span className="text-alto text-xs">{time}</span>
      </div>
      <p className="mt-2.5">{content}</p>
    </li>
  );
};

export default CommentItem;
