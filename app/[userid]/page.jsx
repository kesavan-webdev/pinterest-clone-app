"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import UserInfo from "@/components/user-info/userinfo";
import { app } from "@/firebase/firebase.config";
import PinList from "@/components/userpins/pinlist";
import { useSession } from "next-auth/react";

const db = getFirestore(app);

const Profile = ({ params }) => {
  const [userInfo, setUserInfo] = useState();
  const [listOfPins, setListOfPins] = useState([]);

  const { data: session } = useSession();

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
    getUserInfo(params.userid.replace("%40", "@"));
  }, [params]);

  useEffect(() => {
    if (userInfo) {
      getCurrentUserPins();
    }
  }, [userInfo, listOfPins]);

  const getCurrentUserPins = async () => {
    const db = getFirestore(app);
    const q = query(
      collection(db, "pinterest-data"),
      where("userEmail", "==", userInfo?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setListOfPins((prev) => [...prev, doc.data()]);
      console.log(listOfPins);
    });
  };

  return (
    userInfo && (
      <>
        <UserInfo userInfo={userInfo} />
        <PinList listOfPins={listOfPins} />
      </>
    )
  );
};

export default Profile;
