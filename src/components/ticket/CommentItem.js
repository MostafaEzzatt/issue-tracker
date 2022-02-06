import { useEffect, useRef } from "react";

const CommentItem = ({ user, time, content, idx, fullLength }) => {
  return (
    <li className="p-10px">
      <div className="flex items-end gap-2">
        <h4 className="font-semibold text-cod-gray">{user.displayName}</h4>
        <span className="text-xs text-alto">{time}</span>
      </div>
      <p className="mt-10px">{content}</p>
    </li>
  );
};

export default CommentItem;
