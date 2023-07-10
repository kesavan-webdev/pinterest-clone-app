"use client";
import { useState } from "react";
import InputFile from "../input-file/inputfile";
import UserTag from "../user-tag/usertag";

const Form = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [link, setLink] = useState();
  const [file, setFile] = useState();

  const handleSubmit = () => {};
  return (
    <form
      className="flex flex-col justify-center items-center mt-10"
      onSubmit={() => handleSubmit()}
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
