import { useState } from "react";

// Components
import SignUp from "../components/form/SignUp";
import Signin from "../components/form/SignIn";

// Auth Check Components
import NotAuthorized from "../components/auth/NotAuthorized";

export default function Home() {
  const [form, setForm] = useState("signup");

  return (
    <NotAuthorized>
      <>
        <div className="flex h-screen w-full flex-col items-center justify-center">
          {form == "signup" ? (
            <SignUp changeFrom={setForm} />
          ) : (
            <Signin changeFrom={setForm} />
          )}
        </div>
      </>
    </NotAuthorized>
  );
}
