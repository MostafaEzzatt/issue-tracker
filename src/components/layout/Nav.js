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
    <nav className="sticky top-0 flex h-screen w-full flex-col border-r border-solid border-black/5 bg-white pt-12">
      <FullLogo className="mx-auto hidden md:block" />
      <SmallLogo className="mx-auto block md:hidden" />

      <ul className="mt-14 flex-auto space-y-4 pl-10">
        <li>
          <Link href="/">
            <a className="text-xl font-medium text-cod-gray hover:text-dodger-blue">
              Dashboard
            </a>
          </Link>
        </li>
        <li className="flex pr-3">
          <Link href="/project">
            <a className="flex-auto text-xl font-medium text-cod-gray hover:text-dodger-blue">
              Projects
            </a>
          </Link>

          {authorized.user.role == "admin" && (
            <Link href="/project/new">
              <a className="flex items-center justify-center rounded bg-dodger-blue px-1 py-1 transition-colors hover:bg-moody-blue">
                <Plus className="h-5 w-5 text-white" />
              </a>
            </Link>
          )}
        </li>
        <li className="flex pr-3">
          <Link href="/tickets">
            <a className="flex-auto text-xl font-medium text-cod-gray hover:text-dodger-blue">
              Tickets
            </a>
          </Link>

          <Link href="/tickets/new">
            <a className="flex items-center justify-center rounded bg-dodger-blue px-1 py-1 transition-colors hover:bg-moody-blue">
              <Plus className="h-5 w-5  text-white" />
            </a>
          </Link>
        </li>
      </ul>

      <div className="flex w-full border-t border-black/5 py-3 px-2">
        <span className="flex-auto">{authorized.user.displayName}</span>
        <button
          className="text-scorpion transition-colors hover:text-dodger-blue"
          onClick={() => signOut(auth)}
        >
          <Logout className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
