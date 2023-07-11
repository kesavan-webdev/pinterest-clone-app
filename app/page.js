"use client";
import PinList from "@/components/userpins/pinlist";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/firebase/firebase.config";
import { useEffect, useState } from "react";

const db = getFirestore(app);

export default function Home() {
  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    getAllPins();
  }, []);
  const getAllPins = async () => {
    const querySnapshot = await getDocs(collection(db, "pinterest-data"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setListOfPins((prev) => [...prev, doc.data()]);
    });
  };

  return <PinList listOfPins={listOfPins} />;
}
