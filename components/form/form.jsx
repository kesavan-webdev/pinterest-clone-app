"use client";
import { useState } from "react";
import InputFile from "../input-file/inputfile";
import UserTag from "../user-tag/usertag";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase/firebase.config";
import { useSession } from "next-auth/react";
import {
  doc,
  setDoc,
  getFirestore,
  addDoc,
  collection,
} from "firebase/firestore";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Form = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = (e) => {
    if (session?.user) {
      if (title && desc && link && file) {
        e.preventDefault();
        uploadFile();
        setLoading(true);
        router.push("/" + session?.user?.email);
      } else {
        alert("please fill all the field");
      }
    } else {
      router.push("/");
    }
  };

  const uploadFile = () => {
    const postId = Date.now();

    // Initialize Cloud Storage and get a reference to the service
    const storage = getStorage(app);

    // Create a reference to 'mountains.jpg'
    const imageRef = ref(storage, "pinterest/" + file?.name);
    // 'file' comes from the Blob or File API
    uploadBytes(imageRef, file).then(
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      () => {
        getDownloadURL(imageRef).then(async (downloadURL) => {
          console.log("File available at", downloadURL);

          const postData = {
            title,
            desc,
            link,
            image: downloadURL,
            userName: session.user.name,
            userEmail: session.user.email,
            userImage: session.user.image,
            id: postId,
          };
          const db = getFirestore(app);
          await addDoc(collection(db, "pinterest-data"), postData).then(
            (res) => {
              console.log("saved");
            }
          );
        });
      }
    );
  };

  return (
    <form
      className="flex flex-col justify-center items-center mt-10"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">What is your Title?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="label">
          <span className="label-text-alt">
            only 40 chars will show on feed
          </span>
        </label>
      </div>
      <InputFile setFile={setFile} />
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">
            Tell everyone what your pin is about
          </span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">add a destination link</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div>
        <UserTag />
      </div>
      <button type="submit" className="btn btn-success mt-10 ">
        {loading ? (
          <span className="animate-spin">
            <AiOutlineLoading3Quarters />
          </span>
        ) : (
          <span>save</span>
        )}
      </button>
    </form>
  );
};

export default Form;
