import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Router from "next/router";

// Components
import LoadingBlock from "../shared/LoadingBlock";
import ErrorBlock from "../shared/ErrorBlock";

// Custom Hooks
import useGetManager from "../../hooks/useGetManager";

// Redux
import ProjectMenu from "./ProjectMenu";

const ProjectCard = ({ id, img, title, manager, description, state }) => {
  const { manager: managerData, loading, error } = useGetManager(manager);

  if (error && !loading) return <ErrorBlock message={error} />;
  if (loading && !error) return <LoadingBlock />;

  return (
    <Link href={`/project/${id}`}>
      <a className="z-10 block shadow-sm hover:shadow">
        <div className="rounded bg-white py-2.5 px-3">
          <div className="mb-2.5 flex gap-x-2 border-b border-solid border-black/10 pb-2.5">
            {/* <!-- Logo --> */}
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              {img ? (
                <Image
                  src={img}
                  width={50}
                  height={50}
                  alt={title}
                  objectFit="cover"
                  objectPosition="center"
                />
              ) : (
                <FakeIcon />
              )}
            </div>

            {/* <!-- Meta --> */}
            <div className="flex-auto">
              <h4 className="text-lg font-semibold">{title}</h4>
              <div className="text-tower-gray mt-1 flex flex-col gap-1 text-xs md:flex-row">
                <div>Manager : {managerData.displayName}</div>
                <div>
                  Status :{" "}
                  <span
                    className={
                      state == "open" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {state}
                  </span>
                </div>
              </div>
            </div>

            {/* <!-- Menu --> */}
            <ProjectMenu id={id} />
          </div>
          <p className="text-scorpion">
            {description.length > 300
              ? `${description.substring(0, 299)} ...`
              : description}
          </p>
        </div>
      </a>
    </Link>
  );
};

const FakeIcon = () => {
  return (
    <div className="bg-silver h-[50px] w-[50px] w-full rounded-full"></div>
  );
};

export default ProjectCard;
