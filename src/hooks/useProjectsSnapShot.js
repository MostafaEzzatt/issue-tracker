import { useEffect } from "react";

// Firebase
import { firestore } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux";
import {
  addProject,
  deleteProject,
  updateProject,
} from "../redux/features/projects/projectSlice";

const useProjectsSnapShot = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const projectsCollectionRef = collection(firestore, "Projects");
    const projectsSnapShot = onSnapshot(projectsCollectionRef, {
      next: (snap) => {
        snap.docChanges().map((change) => {
          const project = {
            project: { id: change.doc.id, ...change.doc.data() },
          };

          if (change.type == "added") {
            dispatch(addProject(project));
          } else if (change.type == "modified") {
            dispatch(updateProject(project));
          } else if (change.type == "removed") {
            dispatch(deleteProject(project));
          }
        });
      },
    });

    return () => {
      projectsSnapShot();
    };
  }, []);
};

export default useProjectsSnapShot;
