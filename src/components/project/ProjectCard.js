import Image from "next/image";

// Components
import Stamp from "../ticket/Stamp";

const ProjectCard = ({ img, title, startedAt, manager, description }) => {
  return (
    <li>
      <div className="w-full bg-white p-10px">
        <div className="pb-10px border-b border-solid border-black/5">
          <div className="flex items-center gap-x-2">
            <Image
              src={img}
              alt={title}
              width={50}
              height={50}
              className="rounded-full"
            />
            <h3 className="text-3xl font-semibold">{title}</h3>
            <Stamp type="open" />
          </div>
          <div className="mt-10px">
            <ul className="flex gap-x-7">
              <li>
                <span className="text-dodger-blue">@</span> {startedAt}
              </li>
              <li>
                <span className="text-dodger-blue">Manager</span> {manager}
              </li>
            </ul>
          </div>
        </div>

        <p>{description}</p>
      </div>
    </li>
  );
};

export default ProjectCard;
