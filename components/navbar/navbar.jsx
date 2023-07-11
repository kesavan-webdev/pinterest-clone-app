"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { app } from "@/firebase/firebase.config";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();

  const router = useRouter();
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const saveUserInfoInFirebase = async () => {
    session &&
      (await setDoc(doc(db, "users", session?.user?.email), {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }));
  };

  console.log(session);

  useEffect(() => {
    saveUserInfoInFirebase();
  }, [session]);

  const signInUser = () => {
    signIn();
    router.push("/");
  };

  const signOutUser = () => {
    signOut();
    router.push("/");
  };

  const handleCreate = () => {
    router.push("/pin-builder");
    if (session?.user) {
    } else {
      signInUser();
    }
  };
  return (
    <div className="navbar bg-base-100">
      <div>
        <Image
          src="/pinterest-logo-emblem-png-11.png"
          width={50}
          height={50}
          alt="logo"
        />
      </div>
      <div className="flex-1">
        <a
          className="btn btn-ghost normal-case text-xl"
          onClick={() => router.push("/")}
        >
          Pinterest
        </a>
      </div>
      <div>
        <button className="bg-black text-white p-3 rounded-full">Home</button>
      </div>
      <div>
        <button
          className="bg-white p-3 rounded-full"
          onClick={() => handleCreate()}
        >
          Create
        </button>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        {session?.user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={session?.user?.image}
                  width={50}
                  height={50}
                  alt="user-profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  onClick={() => router.push("/" + session?.user?.email)}
                  className="justify-between"
                >
                  Profile
                  <span className="badge">New</span>
                </button>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={() => signOutUser()}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="bg-black text-white p-3 rounded-full"
            onClick={() => signInUser()}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
