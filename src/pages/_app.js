import store from "../redux/store";
import { Provider } from "react-redux";
import CheckAuth from "../components/auth/CheckAuth";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CheckAuth>
        <Component {...pageProps} />
      </CheckAuth>
    </Provider>
  );
}

export default MyApp;
