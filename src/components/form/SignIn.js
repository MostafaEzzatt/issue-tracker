import { useState, useEffect } from "react";

// Components
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";

// Helpers
import validateEmail from "../../helpers/validateEmail";
import validatePassword from "../../helpers/validatePassword";

// Firebase
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Signin({ changeFrom }) {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("passwordD2@");
  const [error, setError] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(true);

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setSubmitted(false);
    }
  }, [email, password]);

  function emailHandle(e) {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setError({ ...error, email: "" });
    } else {
      setError({ ...error, email: "Please Set Viable Email" });
    }
  }

  function passwordHandle(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    try {
      const signin = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.message == "Firebase: Error (auth/user-not-found).") {
        setError({ ...error, email: "This Email Not Exist." });
      } else if (error.message == "Firebase: Error (auth/wrong-password).") {
        setError({
          email: "",
          password: "Please Make Sure You Typed Your Credential Right.",
        });
      }
    }
  }
  return (
    <>
      <h1 className="mb-8 w-96 border-b border-solid border-black/10 pb-2.5 text-center text-4xl font-bold">
        {" "}
        Sign Up{" "}
      </h1>
      <div className="w-96 space-y-4 rounded bg-white px-2.5 py-5 shadow-sm">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email:"
            value={email}
            handleChange={emailHandle}
            error={error.email}
          />
          <PasswordInput
            label="Password:"
            value={password}
            handleChange={passwordHandle}
            error={error.password}
          />

          <button
            type="submit"
            className="bg-dodger-blue hover:bg-moody-blue disabled:bg-scorpion mt-5 w-full rounded py-2.5 text-sm font-semibold text-white"
            disabled={submitted}
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="text-scorpion mt-2 font-medium">
        Don&apos;t have an account yet?{" "}
        <button
          className="text-cod-gray hover:text-dodger-blue font-semibold outline-none transition-colors"
          onClick={() => changeFrom("signup")}
        >
          SignUp Here
        </button>
      </div>
    </>
  );
}
