"use client";
import { useState } from "react";
import InputFile from "../input-file/inputfile";
import UserTag from "../user-tag/usertag";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase/firebase.config";
import { useSession } from "next-auth/react";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const Form = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [link, setLink] = useState();
  const [file, setFile] = useState();

  const { data: session } = useSession();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, desc, link, file);
    uploadFile();
  };

  const uploadFile = async () => {
    const postId = Date.now();

    // Initialize Cloud Storage and get a reference to the service
    const storage = getStorage(app);
    const db = getFirestore(app);
    // Create a reference to 'mountains.jpg'
    const imageRef = ref(storage, "pinterest/" + file.name);
    // 'file' comes from the Blob or File API
    await uploadBytes(imageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then(
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        await getDownloadURL(imageRef).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          const postData = {
            title,
            desc,
            link,
            image: downloadURL,
            userName: session.user.name,
            userEmail: session.user.email,
            userImage: session.user.image,
          };
          await setDoc(doc(db, "pinterest-data", postId), postData).then(
            (res) => {
              console.log("saved");
            }
          );
        })
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
      <button type="submit" className="btn btn-success mt-10">
        save
      </button>
    </form>
  );
};

export default Form;
