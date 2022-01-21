import { useEffect } from "react";

// Firebase
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { auth } from "../../firebase";

// Redux
import { login } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

// Components
import Loading from "../layout/Loading";

const CheckAuth = ({ children }) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state) => state.auth);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      let userObject = { user: {}, isLoggedIn: false, isLoading: false };

      console.log(user);

      if (user && user.displayName) {
        userObject.user = {
          uuid: user.uid,
          displayName: user.displayName,
          email: user.email,
        };
        userObject.isLoggedIn = true;
      } else {
        updateCurrentUser(auth);
      }
      dispatch(login(userObject));
    });
    return unSub;
  }, []);

  if (authorization.isLoading) return <Loading />;
  return children;
};

export default CheckAuth;
