import { useRouter } from "next/router";
import Link from "next/link";

// Components
import Nav from "./Nav";

// Auth Check Comp
import Authorized from "../auth/Authorized";

// Aassets
import ArrowRight from "../../assets/arrowRight.svg";
import LogOut from "../../assets/logout.svg";
import Close from "../../assets/close.svg";

// Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const Layout = ({ children }) => {
  const authorized = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const route = useRouter();

  const handleSignOut = () => {
    dispatch(logout());
    signOut(auth);
  };

  return (
    <Authorized>
      <div className="flex h-screen w-full bg-[#FCFCFC]">
        <Nav />
        <div className="w-contentWidth md:w-mdContentWidth flex h-screen flex-auto flex-col">
          {/* <!-- Top Bar --> */}
          <div className="flex h-12 items-center justify-between bg-white px-3 shadow-sm">
            <div className="flex items-center gap-1 capitalize text-gray-500">
              {route.asPath
                .slice(1, route.asPath.length)
                .split("/")
                .map((str, idx) => (
                  <span key={str} className="flex items-center gap-1">
                    {idx >= 1 && (
                      <span>
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    )}
                    {idx == 0 ? (
                      <Link href={`/${str}`}>
                        <a>{str}</a>
                      </Link>
                    ) : (
                      <>
                        <span>{str}</span>
                      </>
                    )}
                  </span>
                ))}
            </div>
            <button
              onClick={() => handleSignOut()}
              className="text-cod-gray hover:text-dodger-blue"
            >
              <div className="flex gap-x-3">
                <div className="font-semibold">
                  {authorized.user.displayName}
                </div>
                <div>
                  <LogOut className="h-6 w-6" />
                </div>
              </div>
            </button>
          </div>

          {/* <!-- Content --> */}
          <div className="h-contentHeight flex-auto overflow-y-auto pt-8">
            {children}
          </div>
        </div>
      </div>
    </Authorized>
  );
};

export default Layout;
