import { useEffect } from "react";

// Firebase
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { auth, firestore } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

// Redux
import { login } from "../../redux/features/auth/authSlice";
import { getUsers } from "../../redux//features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";

// Components
import Loading from "../layout/Loading";

const CheckAuth = ({ children }) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state) => state.auth);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      let userObject = { user: {}, isLoggedIn: false, isLoading: false };

      if (user) {
        const authDocRef = doc(firestore, "Users", user.uid);
        getDoc(authDocRef).then((user) => {
          userObject.user = { ...user.data() };
          userObject.isLoggedIn = true;
          dispatch(login(userObject));
        });
      } else {
        dispatch(login(userObject));
      }
    });

    dispatch(getUsers());
    return unSub;
  }, []);

  if (authorization.isLoading) return <Loading />;
  return children;
};

export default CheckAuth;
