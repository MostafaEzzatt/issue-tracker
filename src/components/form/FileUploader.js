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
    <div className="group border-scorpion bg-alto my-2.5 flex h-32 w-full justify-center rounded border-2 border-dashed">
      <label className="text-scorpion group-hover:text-cod-gray flex h-full w-full cursor-pointer flex-col items-center justify-center font-black transition-colors">
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
      <div className="border-scorpion text-scorpion group-hover:border-cod-gray group-hover:text-cod-gray mb-1 flex h-12 w-12 items-center justify-center rounded-full border transition-colors">
        {url.trim().length == 0 ? (
          <Plus className="h-6 w-6" />
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
