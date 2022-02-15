import Image from "next/image";
import Link from "next/link";

//Assets
import ArrowNarrowRight from "../../assets/arrowNarrowRight.svg";

const ProjectSmallCard = ({ id, img, name, description }) => {
  return (
    <Link href={`project/${id}`}>
      <a className="col-span-2">
        <div className="group h-full w-full cursor-pointer bg-white p-2.5 shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between border-b border-solid border-black/5 pb-2.5">
            <div>
              {img ? (
                <Image
                  src={img}
                  alt={name}
                  width={24}
                  height={24}
                  className="inline-block rounded-full"
                />
              ) : (
                <div className="bg-alto inline-block h-6 w-6 rounded-full"></div>
              )}

              <h2 className="w-minTitleWidth text-cod-gray ml-2 inline-block truncate break-words font-semibold capitalize">
                {name}
              </h2>
            </div>
            <ArrowNarrowRight className="text-moody-blue/30 group-hover:text-moody-blue block w-6 min-w-[24px]" />
          </div>
          <p className="text-scorpion mt-2.5 text-sm">
            {description.length > 100
              ? `${description.substring(0, 99)} ...`
              : description}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default ProjectSmallCard;
