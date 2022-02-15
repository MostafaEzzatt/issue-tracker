import Link from "next/link";

// Assets
import FullLogo from "../../assets/logo.svg";
import LogoIcon from "../../assets/logoIcon.svg";
import Ticket from "../../assets/ticket.svg";
import Clipboard from "../../assets/clipboard.svg";
import Home from "../../assets/home.svg";

// Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

// Redux
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import ActiveLink from "./ActiveLink";

const Nav = () => {
  const dispatch = useDispatch();

  return (
    <div className="h-full w-16 border-r border-solid border-black/10 bg-white md:w-64">
      <div className="relative h-28 w-full md:h-52">
        {/* Small Logo */}
        <div className="absolute left-1/2 top-1/2 h-[92px] w-12 -translate-y-1/2 -translate-x-1/2 transform md:hidden">
          <LogoIcon />
        </div>

        {/* Full Logo */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-y-1/2 -translate-x-1/2 transform md:block">
          <FullLogo />
        </div>
      </div>

      <ul className="mt-2.5">
        {/* <!-- List Item --> */}
        <li className="group">
          <ActiveLink activeClassName="active" href="/dashboard">
            <a>
              <div className="flex h-12 w-full cursor-pointer items-center px-4 transition-colors group-hover:bg-[#F9F9F9]">
                {/* <!-- icon --> */}
                <div className="ml-2 h-6 w-6 transition-colors group-hover:text-[#5D92FF] md:ml-0">
                  <Home />
                </div>
                {/* <!-- Text --> */}
                <div className="ml-6 hidden font-medium capitalize md:block">
                  Home
                </div>
              </div>
            </a>
          </ActiveLink>
        </li>

        {/* <!-- List Item --> */}
        <li className="group">
          <ActiveLink activeClassName="active" href="/project">
            <a>
              <div className="flex h-12 w-full cursor-pointer items-center px-4 transition-colors group-hover:bg-[#F9F9F9]">
                {/* <!-- icon --> */}
                <div className="ml-2 h-6 w-6 transition-colors group-hover:text-[#5D92FF] md:ml-0">
                  <Clipboard />
                </div>
                {/* <!-- Text --> */}
                <div className="ml-6 hidden font-medium capitalize md:block">
                  Projects
                </div>
              </div>
            </a>
          </ActiveLink>
        </li>

        {/* <!-- List Item --> */}
        <li className="group">
          <ActiveLink activeClassName="active" href="/tickets">
            <a>
              <div className="flex h-12 w-full cursor-pointer items-center px-4 transition-colors group-hover:bg-[#F9F9F9]">
                {/* <!-- icon --> */}
                <div className="ml-2 h-6 w-6 transition-colors group-hover:text-[#5D92FF] md:ml-0">
                  <Ticket />
                </div>
                {/* <!-- Text --> */}
                <div className="ml-6 hidden font-medium capitalize md:block">
                  Tickets
                </div>
              </div>
            </a>
          </ActiveLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
