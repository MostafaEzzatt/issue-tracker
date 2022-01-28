import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import checkIfProjectPinned from "./checkIfProjectPinned";

const pinProject = (project, pinnedProjectsList, auth) => {
  const isProjectAlreadyPinned = checkIfProjectPinned(
    project,
    pinnedProjectsList
  );

  console.log(pinnedProjectsList);

  const projectActionDocRef = doc(
    firestore,
    "Actions",
    `${project}_${auth.user.uuid}_project`
  );

  if (!isProjectAlreadyPinned) {
    setDoc(projectActionDocRef, {
      type: "PINNED-PROJECT",
      action: doc(firestore, "Projects", project),
      user: doc(firestore, "Users", auth.user.uuid),
    });
  } else {
    deleteDoc(projectActionDocRef);
  }
};

export default pinProject;
