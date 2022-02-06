import Image from "next/image";
import Link from "next/link";

//Assets
import ArrowNarrowRight from "../../assets/arrowNarrowRight.svg";

const ProjectSmallCard = ({ id, img, name, description }) => {
  return (
    <Link href={`project/${id}`}>
      <a className="col-span-2">
        <div className="group h-full w-full cursor-pointer bg-white p-10px shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between border-b border-solid border-black/5 pb-10px">
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
                <div className="inline-block h-6 w-6 rounded-full bg-alto"></div>
              )}

              <h2 className="ml-2 inline-block w-minTitleWidth truncate break-words font-semibold capitalize text-cod-gray">
                {name}
              </h2>
            </div>
            <ArrowNarrowRight className="block w-6 min-w-[24px] text-moody-blue/30 group-hover:text-moody-blue" />
          </div>
          <p className="mt-10px text-sm text-scorpion">
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
