import { useEffect } from "react";

// Firebase
import { firestore } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux";
import {
  addAction,
  updateAction,
  deleteAction,
} from "../redux/features/actions/actionsSlice";

const useActionsSnapShot = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const commentsCollectionRef = collection(firestore, "Actions");

    const commentsSnapShot = onSnapshot(commentsCollectionRef, {
      next: (snap) => {
        snap.docChanges().map((change) => {
          const action = {
            action: { id: change.doc.id, ...change.doc.data() },
          };

          if (change.type == "added") {
            dispatch(addAction(action));
          } else if (change.type == "modified") {
            dispatch(updateAction(action));
          } else if (change.type == "removed") {
            dispatch(deleteAction(action));
          }
        });
      },
    });

    return () => {
      commentsSnapShot();
    };
  }, []);
};

export default useActionsSnapShot;
