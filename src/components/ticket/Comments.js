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
          className="space-y-10px divide-y divide-black/10 max-h-96 overflow-y-scroll"
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
            <div className="w-full bg-white text-scorpion font-bold py-6 text-center">
              {error}
            </div>
          )}
        </ul>
        <div className="m-10px relative">
          <input
            type="text"
            className="w-full py-2 pl-10px pr-8 bg-alabaster text-cod-gray outline-none rounded"
            placeholder="Type You Comment Here And Click Enter"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
          />
          <SpeakerPhone className="w-5 absolute right-3 top-2/4 transform -translate-y-2/4 text-alto" />
        </div>
      </div>
    </>
  );
};

export default Comments;
