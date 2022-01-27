import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const useUserVisitedTicketAction = () => {
  return (ticket, auth) => {
    const ACTION_TYPE = "VISITED_TICKET";
    const docRef = doc(
      firestore,
      "Actions",
      `${ticket.id}_${auth.user.uuid}_ticket`
    );
    setDoc(
      docRef,
      {
        type: ACTION_TYPE,
        user: doc(firestore, "Users", auth.user.uuid),
        action: doc(firestore, "Tickets", ticket.id),
      },
      { merge: true }
    );
  };
};

export default useUserVisitedTicketAction;
