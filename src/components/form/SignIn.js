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
import { toast } from "react-toastify";

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
            const signin = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (error) {
            if (error.message == "Firebase: Error (auth/user-not-found).") {
                setError({ ...error, email: "This Email Not Exist." });
            } else if (
                error.message == "Firebase: Error (auth/wrong-password)."
            ) {
                setError({
                    email: "",
                    password:
                        "Please Make Sure You Typed Your Credential Right.",
                });
            }
        }
    }

    // this is part for testing
    const signInAsMember = async () => {
        try {
            const signin = await signInWithEmailAndPassword(
                auth,
                "member@user.com",
                "Pass123@"
            );
        } catch (error) {
            toast.error(error.message);
        }
    };
    const signInAsManager = async () => {
        try {
            const signin = await signInWithEmailAndPassword(
                auth,
                "manager@mail.com",
                "Pass123@"
            );
        } catch (error) {
            toast.error(error.message);
        }
    };
    const signInAsAdmin = async () => {
        try {
            const signin = await signInWithEmailAndPassword(
                auth,
                "admin@mail.com",
                "Pass123@"
            );
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <h1 className="mb-8 w-96 border-b border-solid border-black/10 pb-2.5 text-center text-4xl font-bold">
                Sign Up
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
                        className="mt-5 w-full rounded bg-dodger-blue py-2.5 text-sm font-semibold text-white hover:bg-moody-blue disabled:bg-scorpion"
                        disabled={submitted}
                    >
                        Sign In
                    </button>
                </form>
            </div>

            <div className="mt-4 w-96 space-y-4 rounded bg-white px-2.5 py-5 text-center shadow-sm">
                <div className="font-bold">Login As</div>
                <div className="flex justify-between px-3">
                    <button
                        className="rounded px-5 py-2 font-medium text-dodger-blue transition-colors hover:bg-gray-50 hover:text-moody-blue"
                        onClick={() => signInAsMember()}
                    >
                        Member
                    </button>
                    <button
                        className="rounded px-5 py-2 font-medium text-dodger-blue transition-colors hover:bg-gray-50 hover:text-moody-blue"
                        onClick={() => signInAsManager()}
                    >
                        Manager
                    </button>
                    <button
                        className="rounded px-5 py-2 font-medium text-dodger-blue transition-colors hover:bg-gray-50 hover:text-moody-blue"
                        onClick={() => signInAsAdmin()}
                    >
                        Admin
                    </button>
                </div>
            </div>

            <div className="mt-2 font-medium text-scorpion">
                Don&apos;t have an account yet?{" "}
                <button
                    className="font-semibold text-cod-gray outline-none transition-colors hover:text-dodger-blue"
                    onClick={() => changeFrom("signup")}
                >
                    SignUp Here
                </button>
            </div>
        </>
    );
}
