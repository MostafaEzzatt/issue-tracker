import { useEffect } from "react";

// Firebase
import { auth, firestore } from "../firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

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
    if (auth.currentUser) {
      const actionsCollectionRef = collection(firestore, "Actions");
      const actionQueryRef = query(
        actionsCollectionRef,
        where("user", "==", doc(firestore, "Users", auth.currentUser.uid))
      );

      const actionsSnapShot = onSnapshot(actionQueryRef, {
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
        actionsSnapShot();
      };
    }
  }, []);
};

export default useActionsSnapShot;
