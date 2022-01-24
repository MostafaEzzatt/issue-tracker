import { useState, useEffect } from "react";
import Image from "next/image";

// Assets
import Plus from "../../assets/plus.svg";

const FileUploader = ({ file, setFile, url = "" }) => {
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
        {file?.name || <UploadIcon url={url} />}
        <p>{error}</p>
        <input type="file" onChange={changeHandler} className="hidden" />
      </label>
    </div>
  );
};

const UploadIcon = ({ url }) => {
  return (
    <>
      <div className="w-12 h-12 flex justify-center items-center text-scorpion group-hover:text-cod-gray rounded-full border border-scorpion group-hover:border-cod-gray transition-colors mb-1">
        {url.trim().length == 0 ? (
          <Plus className="w-6 h-6" />
        ) : (
          <Image
            src={url}
            alt="icon"
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
      </div>
      Icon
    </>
  );
};

export default FileUploader;
