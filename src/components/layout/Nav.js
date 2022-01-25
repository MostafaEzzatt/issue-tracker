import Link from "next/link";

// Assets
import FullLogo from "../../assets/logo.svg";
import SmallLogo from "../../assets/small-logo.svg";
import Logout from "../../assets/logout.svg";
import Plus from "../../assets/plus.svg";

// Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

// Redux
import { useSelector } from "react-redux";

const Nav = () => {
  const authorized = useSelector((state) => state.auth);
  return (
    <nav className="w-full h-screen sticky top-0 pt-12 bg-white border-r border-solid border-black/5 flex flex-col">
      <FullLogo className="mx-auto hidden md:block" />
      <SmallLogo className="mx-auto block md:hidden" />

      <ul className="mt-14 pl-10 space-y-4 flex-auto">
        <li>
          <Link href="/">
            <a className="font-medium text-xl text-cod-gray hover:text-dodger-blue">
              Dashboard
            </a>
          </Link>
        </li>
        <li className="flex pr-3">
          <Link href="/project">
            <a className="font-medium text-xl text-cod-gray hover:text-dodger-blue flex-auto">
              Projects
            </a>
          </Link>

          {authorized.user.role == "admin" && (
            <Link href="/project/new">
              <a className="px-1 py-1 bg-dodger-blue hover:bg-moody-blue transition-colors rounded flex justify-center items-center">
                <Plus className="w-5 h-5 text-white" />
              </a>
            </Link>
          )}
        </li>
        <li className="flex pr-3">
          <Link href="/tickets">
            <a className="font-medium text-xl text-cod-gray hover:text-dodger-blue flex-auto">
              Tickets
            </a>
          </Link>

          <Link href="/tickets/new">
            <a className="px-1 py-1 bg-dodger-blue hover:bg-moody-blue transition-colors rounded flex justify-center items-center">
              <Plus className="w-5 h-5  text-white" />
            </a>
          </Link>
        </li>
      </ul>

      <div className="w-full flex border-t border-black/5 py-3 px-2">
        <span className="flex-auto">{authorized.user.displayName}</span>
        <button
          className="text-scorpion hover:text-dodger-blue transition-colors"
          onClick={() => signOut(auth)}
        >
          <Logout className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
