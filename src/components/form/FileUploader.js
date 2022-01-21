import { useState } from "react";
import Plus from "../../assets/plus.svg";

const FileUploader = ({ file, setFile }) => {
  const [error, setError] = useState("");

  const changeHandler = (e) => {
    const selected = e.target.files[0];
    const types = ["image/png", "image/jpeg"];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setError("only png/jpeg files allowed");
    }
  };
  return (
    <div className="w-full h-32 border-2 border-dashed border-scorpion bg-alto my-10px rounded flex justify-center group">
      <label className="flex flex-col items-center justify-center font-black text-scorpion group-hover:text-cod-gray transition-colors w-full h-full cursor-pointer">
        {file?.name || <UploadIcon />}
        <p>{error}</p>
        <input type="file" onChange={changeHandler} className="hidden" />
      </label>
    </div>
  );
};

const UploadIcon = () => {
  return (
    <>
      <div className="w-12 h-12 flex justify-center items-center text-scorpion group-hover:text-cod-gray rounded-full border border-scorpion group-hover:border-cod-gray transition-colors mb-1">
        <Plus className="w-6 h-6" />
      </div>
      Icon
    </>
  );
};

export default FileUploader;
