import Image from "next/image";

//Assets
import ArrowNarrowRight from "../../assets/arrowNarrowRight.svg";

const ProjectSmallCard = ({ img, name, description }) => {
  return (
    <div className="w-full p-10px col-span-2 bg-white shadow-sm hover:shadow-md group cursor-pointer">
      <div className="flex justify-between items-center pb-10px border-b border-solid border-black/5">
        <div className="flex gap-x-2">
          <Image
            src={img}
            alt={name}
            width={24}
            height={24}
            className="rounded-full"
          />

          <h2 className="font-semibold text-cod-gray">{name}</h2>
        </div>
        <ArrowNarrowRight className="w-6 text-moody-blue/30 group-hover:text-moody-blue" />
      </div>
      <p className="mt-10px text-scorpion text-sm">{description}</p>
    </div>
  );
};

export default ProjectSmallCard;
