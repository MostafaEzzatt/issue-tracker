import { useEffect } from "react";

// Firebase
import { firestore } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux";
import {
  addTicket,
  updateTicket,
  deleteTicket,
} from "../redux/features/tickets/ticketsSlice";

const useTicketsSnapShot = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const TicketsCollectionRef = collection(firestore, "Tickets");
    const TicketsSnapShot = onSnapshot(TicketsCollectionRef, {
      next: (snap) => {
        snap.docChanges().map((change) => {
          const ticket = {
            ticket: { id: change.doc.id, ...change.doc.data() },
          };
          if (change.type == "added") {
            dispatch(addTicket(ticket));
          } else if (change.type == "modified") {
            dispatch(updateTicket(ticket));
          } else if (change.type == "removed") {
            dispatch(deleteTicket(ticket));
          }
        });
      },
    });

    return () => {
      TicketsSnapShot();
    };
  }, []);
};

export default useTicketsSnapShot;
