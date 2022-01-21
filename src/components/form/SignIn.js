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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <h1 className="text-4xl pb-10px border-b border-solid border-black/10 w-96 mb-8 text-center font-bold">
        {" "}
        Sign Up{" "}
      </h1>
      <div className="w-96 bg-white shadow-sm py-5 px-10px space-y-4 rounded">
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
            className="w-full mt-5 bg-dodger-blue hover:bg-moody-blue disabled:bg-scorpion py-10px text-sm font-semibold text-white rounded"
            disabled={submitted}
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="mt-2 text-scorpion font-medium">
        Don&apos;t have an account yet?{" "}
        <button
          className="text-cod-gray font-semibold hover:text-dodger-blue transition-colors outline-none"
          onClick={() => changeFrom("signup")}
        >
          SignUp Here
        </button>
      </div>
    </>
  );
}
