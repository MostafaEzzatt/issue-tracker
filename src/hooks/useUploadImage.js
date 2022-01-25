// Firebase
import { firestore, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

// React Toastify
import { toast } from "react-toastify";

const useUploadImage = () => {
  return (projectID, file) => {
    const storageRef = ref(storage, projectID);
    const uploadTask = uploadBytesResumable(storageRef, file);

    let te = uploadTask.on(
      "state_change",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => toast.error("Error While Uploading Project Icon"),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const docRef = doc(firestore, "Projects", projectID);
          setDoc(docRef, { icon: url }, { merge: true }).catch(() => {
            toast.error("Error While Adding Icon To The Project");
          });
        });
      }
    );
  };
};

export default useUploadImage;
