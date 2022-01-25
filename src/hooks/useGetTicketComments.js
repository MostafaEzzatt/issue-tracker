import { comment } from "postcss";
import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

const useGetTicketComments = (ticketId) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reduxComments = useSelector((state) => state.comments);
  const reduxUsers = useSelector((state) => state.users);

  useEffect(() => {
    if ((ticketId, reduxComments.data.length > 0)) {
      const ticketComments = reduxComments.data.filter(
        (comment) => comment.ticket.id == ticketId
      );

      if (ticketComments.length > 0) {
        const getCommentUser = ticketComments.map((comment) => {
          const commentUser = reduxUsers.users.filter(
            (user) => user.uuid == comment.user.id
          );

          const commentDate = new Date(comment.creation.seconds);
          return Object.assign(
            { ...comment },
            {
              user: commentUser[0],
              creation: `${commentDate.getHours()} ${commentDate.getMinutes()} | ${commentDate.getMonth()}/${commentDate.getDay()}/${commentDate.getFullYear()}`,
            }
          );
        });

        setComments(getCommentUser);
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError("This Ticket Have No Comments");
      }
    } else {
      setLoading(false);
      setError("This Ticket Have No Comments");
    }
  }, [reduxComments, ticketId]);
  return { comments, loading, error };
};

export default useGetTicketComments;
