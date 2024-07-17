"use client";
import { auth, db } from "@/app/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  // Initialize Next.js router
  const router = useRouter();

  // State variables for form inputs and modal state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fname, setFname] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Function to register a new user
  const register = async () => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userDocRef = doc(db, "users", userCredential.user.uid);

    // Save user details
    await setDoc(userDocRef, {
      email: email,
      fname: fname,
      lname: lName,
      phone: phone,
    });

    // Save address in sub-collection
    const addressCollectionRef = collection(userDocRef, "addresses");
    await setDoc(doc(addressCollectionRef), {
      address: address,
    }).then(() => router.push("/pages/user"));
  };

  // Function to login existing user
  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Extract user and token after successful sign-in
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Store userId and token in localStorage
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("token", token);

      router.push("/pages/user"); // Redirect to user page after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Function to toggle modal state
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to switch to registration form
  const showRegisterForm = () => {
    setIsRegistering(true);
    toggleModal();
  };

  // Function to switch to login form
  const showLoginForm = () => {
    setIsRegistering(false);
    toggleModal();
  };

  // JSX rendering the login or registration form based on state
  return (
    <section className="bg-gradient-to-b from-blue-900 to-blue-500 text-white ">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            {isRegistering ? "Create your account" : "Login to your account"}
          </h2>
          <form className="space-y-4">
            {isRegistering && (
              <div>
                <div className="flex gap-4 py-2.5">
                  <div>
                    <label
                      htmlFor="fname"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="John"
                      required
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lName"
                      className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Doe"
                      required
                      onChange={(e) => setLName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-4 py-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="0771234567"
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="123 Main St"
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="name@company.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="********"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={isRegistering ? register : login}
              >
                {isRegistering ? "Create Account" : "Login"}
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {isRegistering ? (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={showLoginForm}
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={showRegisterForm}
                >
                  Create one
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
