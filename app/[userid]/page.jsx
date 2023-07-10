"use client";
import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import UserInfo from "@/components/user-info/userinfo";
import { app } from "@/firebase/firebase.config";

const db = getFirestore(app);

const Profile = ({ params }) => {
  const [userInfo, setUserInfo] = useState();

  const getUserInfo = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserInfo(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    console.log(params.userid.replace("%40", "@"));
    getUserInfo(params.userid.replace("%40", "@"));
  }, [params]);

  return userInfo && <UserInfo userInfo={userInfo} />;
};

export default Profile;
