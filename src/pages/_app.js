import store from "../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

// Styles
import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

// Components
import CheckAuth from "../components/auth/CheckAuth";
import SnapShots from "../components/firebase/SnapShots";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CheckAuth>
        <SnapShots>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Component {...pageProps} />
        </SnapShots>
      </CheckAuth>
    </Provider>
  );
}

export default MyApp;
