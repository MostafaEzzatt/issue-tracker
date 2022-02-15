import { useEffect, useRef, useState } from "react";

// Firebase
import { firestore } from "../../firebase";
import { addDoc, collection, doc } from "firebase/firestore";

// Components
import SectionTitle from "../SectionTitle";
import CommentItem from "./CommentItem";

// Assets
import SpeakerPhone from "../../assets/speakerphone.svg";

// Redux
import { useSelector } from "react-redux";

// Custom Hook
import useGetTicketComments from "../../hooks/useGetTicketComments";

const Comments = ({ ticketId }) => {
  const [input, setInput] = useState("");
  const auth = useSelector((state) => state.auth);
  const { comments, loading, error } = useGetTicketComments(ticketId);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    const current = messagesEndRef.current;
    if (current) {
      current.scrollBy(0, current.scrollHeight);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const handleEnter = (e) => {
    if (e.code == "Enter" && e.keyCode == 13 && ticketId) {
      const commentDocRef = collection(firestore, "Comments");
      addDoc(commentDocRef, {
        user: doc(firestore, "Users", auth.user.uuid),
        ticket: doc(firestore, "Tickets", ticketId),
        content: input,
        creation: new Date(),
      });
      setInput("");
    }
  };

  return (
    <>
      <SectionTitle title="Comments" />

      <div className="mt-4 w-full bg-white ">
        <ul
          className="max-h-96 space-y-2.5 divide-y divide-black/10 overflow-y-scroll"
          ref={messagesEndRef}
        >
          {comments ? (
            comments.map((comment, idx) => (
              <CommentItem
                key={comment.id}
                user={comment.user}
                time={comment.creation}
                content={comment.content}
                idx={idx}
                fullLength={comments.length}
              />
            ))
          ) : (
            <div className="text-scorpion w-full bg-white py-6 text-center font-bold">
              {error}
            </div>
          )}
        </ul>
        <div className="relative m-2.5">
          <input
            type="text"
            className="bg-alabaster text-cod-gray w-full rounded py-2 pl-2.5 pr-8 outline-none"
            placeholder="Type You Comment Here And Click Enter"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
          />
          <SpeakerPhone className="text-alto absolute right-3 top-2/4 w-5 -translate-y-2/4 transform" />
        </div>
      </div>
    </>
  );
};

export default Comments;
