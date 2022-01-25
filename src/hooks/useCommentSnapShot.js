import { useEffect } from "react";

// Firebase
import { firestore } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../redux/features/comments/commentsSlice";

const useCommentsSnapShot = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const commentsCollectionRef = collection(firestore, "Comments");
    const commentQueryRef = query(
      commentsCollectionRef,
      orderBy("creation", "asc")
    );

    const commentsSnapShot = onSnapshot(commentQueryRef, {
      next: (snap) => {
        snap.docChanges().map((change) => {
          const comment = {
            comment: { id: change.doc.id, ...change.doc.data() },
          };

          if (change.type == "added") {
            dispatch(addComment(comment));
          } else if (change.type == "modified") {
            dispatch(updateComment(comment));
          } else if (change.type == "removed") {
            dispatch(deleteComment(comment));
          }
        });
      },
    });

    return () => {
      commentsSnapShot();
    };
  }, []);
};

export default useCommentsSnapShot;
