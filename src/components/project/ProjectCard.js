import Image from "next/image";

// Components
import Stamp from "../ticket/Stamp";
import LoadingBlock from "../shared/LoadingBlock";
import ErrorBlock from "../shared/ErrorBlock";

// Custom Hooks
import useGetManager from "../../hooks/useGetManager";
import Link from "next/link";

const ProjectCard = ({
  id,
  img,
  title,
  startedAt,
  manager,
  description,
  state,
}) => {
  const { manager: managerData, loading, error } = useGetManager(manager.uuid);

  if (error && loading) return <ErrorBlock message={error} />;
  if (loading && !error) return <LoadingBlock />;
  return (
    <li>
      <Link href={`/project/${id}`}>
        <a>
          <div className="w-full bg-white p-10px drop-shadow-sm transition-shadow hover:shadow-lg">
            <div className="border-b border-solid border-black/5 pb-10px">
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

                <h3 className="w-titleWidth truncate text-3xl font-semibold capitalize">
                  {title}
                </h3>
                <Stamp type={state} />
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
    <div className="h-[50px] w-[50px] w-full rounded-full bg-silver"></div>
  );
};

export default ProjectCard;
