const InputFile = ({ setFile }) => {
  return (
    <input
      type="file"
      className="file-input file-input-bordered file-input-md w-full max-w-xs"
      onChange={(e) => setFile(e.target.files[0])}
    />
  );
};

export default InputFile;
