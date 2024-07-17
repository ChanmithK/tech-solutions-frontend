"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { db } from "@/app/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

interface Address {
  address: string;
}

interface UserData {
  email: string;
  fname: string;
  lname: string;
  phone: string;
  addresses: Address[];
}

const Page = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const userId = localStorage.getItem("userId");

  // Function to fetch user data from Firestore
  const fetchUserData = async (userId: string): Promise<UserData | null> => {
    // Reference to the user document in Firestore
    const userDocRef = doc(db, "users", userId);
    // Retrieve the user document snapshot
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // Extract user data from the document snapshot
      const userData = userDocSnap.data() as UserData;
      // Reference to the addresses collection within the user document
      const addressesCollectionRef = collection(userDocRef, "addresses");
      // Retrieve all documents within the addresses collection
      const addressesSnapshot = await getDocs(addressesCollectionRef);

      const addresses: Address[] = [];
      addressesSnapshot.forEach((doc) => {
        addresses.push(doc.data() as Address);
      });

      userData.addresses = addresses;
      return userData;
    }

    return null;
  };

  useEffect(() => {
    // Effect to fetch user data when userId changes
    const fetchData = async () => {
      if (userId) {
        const data = await fetchUserData(userId);
        setUserData(data);
      }
    };
    fetchData();
  }, [userId]);

  // Render loading spinner if userData is not yet fetched
  if (!userData) {
    return (
      <div>
        <Navbar type="user" />
        <div className="flex items-center justify-center h-screen">
          <svg
            aria-hidden="true"
            className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Render user profile once userData is fetched
  return (
    <div>
      <Navbar type="user" />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>

        {/* User Info Section */}
        <div className="bg-white shadow-md rounded-lg px-8 py-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Personal Information:</h2>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="mb-4">
              <label className="text-lg font-semibold" htmlFor="fname">
                First Name:
              </label>
              <input
                id="fname"
                type="text"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-100 dark:text-black"
                value={userData.fname}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="text-lg font-semibold" htmlFor="lname">
                Last Name:
              </label>
              <input
                id="lname"
                type="text"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-100 dark:text-black"
                value={userData.lname}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="text-lg font-semibold" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-100 dark:text-black"
                value={userData.email}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="text-lg font-semibold" htmlFor="phone">
                Phone Number:
              </label>
              <input
                id="phone"
                type="text"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-100 dark:text-black"
                value={userData.phone}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-white shadow-md rounded-lg px-8 py-6">
          <h2 className="text-2xl font-bold mb-4">Addresses:</h2>
          <ul className="divide-y divide-gray-200">
            {userData.addresses.map((address, index) => (
              <li key={index} className="py-2">
                <p className="text-lg">{address.address}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
