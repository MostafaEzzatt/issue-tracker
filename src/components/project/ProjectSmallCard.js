import Image from "next/image";
import Link from "next/link";

//Assets
import ArrowNarrowRight from "../../assets/arrowNarrowRight.svg";

const ProjectSmallCard = ({ id, img, name, description }) => {
  return (
    <Link href={`project/${id}`}>
      <a className="col-span-2">
        <div className="w-full h-full p-10px bg-white shadow-sm hover:shadow-md group cursor-pointer">
          <div className="flex justify-between items-center pb-10px border-b border-solid border-black/5">
            <div>
              {img ? (
                <Image
                  src={img}
                  alt={name}
                  width={24}
                  height={24}
                  className="rounded-full inline-block"
                />
              ) : (
                <div className="w-6 h-6 bg-alto rounded-full inline-block"></div>
              )}

              <h2 className="font-semibold text-cod-gray truncate break-words capitalize w-minTitleWidth inline-block ml-2">
                {name}
              </h2>
            </div>
            <ArrowNarrowRight className="min-w-[24px] w-6 block text-moody-blue/30 group-hover:text-moody-blue" />
          </div>
          <p className="mt-10px text-scorpion text-sm">
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
