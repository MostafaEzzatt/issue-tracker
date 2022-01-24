import Image from "next/image";

// Components
import Stamp from "../ticket/Stamp";
import LoadingBlock from "../shared/LoadingBlock";
import ErrorBlock from "../shared/ErrorBlock";

// Custom Hooks
import useGetManager from "../../hooks/useGetManager";
import Link from "next/link";

const ProjectCard = ({ id, img, title, startedAt, manager, description }) => {
  const { manager: managerData, loading, error } = useGetManager(manager.id);
  if (error && loading) return <ErrorBlock message={error} />;
  if (loading && !error) return <LoadingBlock />;
  return (
    <li>
      <Link href={`project/${id}`}>
        <a>
          <div className="w-full bg-white p-10px drop-shadow-sm hover:shadow-lg transition-shadow">
            <div className="pb-10px border-b border-solid border-black/5">
              <div className="flex items-center gap-x-2">
                {img ? (
                  <Image
                    src={img}
                    alt={title}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                ) : (
                  <FakeIcon />
                )}

                <h3 className="text-3xl font-semibold truncate capitalize">
                  {title}
                </h3>
                <Stamp type="open" />
              </div>
              <div className="mt-10px">
                <ul className="flex gap-x-7">
                  <li>
                    <span className="text-dodger-blue">@</span> {startedAt}
                  </li>
                  <li>
                    <span className="text-dodger-blue">Manager</span>{" "}
                    {managerData && managerData.displayName}
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-10px">
              {description.length > 300
                ? `${description.substring(0, 299)} ...`
                : description}
            </p>
          </div>
        </a>
      </Link>
    </li>
  );
};

const FakeIcon = () => {
  return (
    <div className="w-[50px] h-[50px] w-full bg-silver rounded-full"></div>
  );
};

export default ProjectCard;
