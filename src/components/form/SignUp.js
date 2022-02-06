import { useState, useEffect } from "react";

// Assets
import Loading from "../../assets/loading.svg";

// Components
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";

// Helpers
import validateEmail from "../../helpers/validateEmail";
import validatePassword from "../../helpers/validatePassword";

// Firebase
import { auth, firestore } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  updateCurrentUser,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup({ changeFrom }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("passwordD2@");
  const [error, setError] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(true);

  useEffect(() => {
    if (
      displayName.length >= 3 &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      setSubmitted(false);
    }
  }, [displayName, email, password]);

  function displayNameHandle(e) {
    setDisplayName(e.target.value);
    if (e.target.value.trim().length < 3) {
      setError({
        ...error,
        displayName:
          "DisplayName Length Should Be More Than Or Equal 3 Characters",
      });
    } else {
      setError({ ...error, displayName: "" });
    }
  }

  function emailHandle(e) {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setError({ ...error, email: "" });
    } else {
      setError({ ...error, email: "Please Set Valid Email" });
    }
  }

  function passwordHandle(e) {
    setPassword(e.target.value);
    if (validatePassword(e.target.value)) {
      setError({ ...error, password: "" });
    } else {
      setError({
        ...error,
        password: (
          <>
            <div className="font-medium">Password Should Contain</div>
            <ul className="mt-2 space-y-1">
              <li>
                <p>at least 8 characters</p>
              </li>
              <li>
                <p>at least one uppercase character</p>
              </li>
              <li>
                <p>at least one lowercase character</p>
              </li>
              <li>
                <p>at least one number</p>
              </li>
              <li>
                <p>at least one special character</p>
              </li>
            </ul>
          </>
        ),
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    try {
      const createAccount = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (createAccount.user) {
        const updateDisplayName = await updateProfile(createAccount.user, {
          displayName: displayName,
        });

        const userDocumentRef = doc(firestore, "Users", createAccount.user.uid);

        await setDoc(userDocumentRef, {
          uuid: createAccount.user.uid,
          displayName: createAccount.user.displayName,
          email: createAccount.user.email,
          role: "member",
        });

        updateCurrentUser(auth, createAccount.user);
      }
    } catch (requestError) {
      if (
        requestError.message == "Firebase: Error (auth/email-already-in-use)."
      ) {
        setError({ ...error, email: "Email Already Exist" });
        setEmail("");
      }
    }
  }

  return (
    <>
      <h1 className="mb-8 w-96 border-b border-solid border-black/10 pb-10px text-center text-4xl font-bold">
        Sign Up
      </h1>
      <div className="w-96 space-y-4 rounded bg-white py-5 px-10px shadow-sm">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Display Name:"
            value={displayName}
            handleChange={displayNameHandle}
            error={error.displayName}
          />
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
            className="mt-5 w-full rounded bg-dodger-blue py-10px text-sm font-semibold text-white transition-colors hover:bg-moody-blue disabled:bg-scorpion"
            disabled={submitted}
          >
            {submitted ? <Loading className="mx-auto h-5 w-5" /> : "Sign Up"}
          </button>
        </form>
      </div>
      <div className="mt-2 font-medium text-scorpion">
        Already Have Account?{" "}
        <button
          className="font-semibold text-cod-gray outline-none transition-colors hover:text-dodger-blue"
          onClick={() => changeFrom("signin")}
        >
          Sign In Here
        </button>
      </div>
    </>
  );
}
