// Components
import Link from "next/link";
import Stamp from "./Stamp";

const TicketCard = ({ id, title, description, priority, assignedBy }) => {
  return (
    <Link href={`/tickets/${id}`}>
      <a className="col-span-12 h-full md:col-span-6 xl:col-span-4" href="">
        <div className="h-full rounded bg-white px-3 py-2.5 shadow-sm">
          <div className="mb-2.5 border-b border-solid border-black/10 pb-2.5">
            <div className="flex justify-between">
              <h4 className="truncate font-semibold">{title}</h4>
              <Stamp type={priority} />
            </div>
            <div className="mt-1 text-sm text-[#5D92FF]">
              Assigned By: {assignedBy}
            </div>
          </div>
          <p className="text-sm text-[#606060]">
            {description.length > 300
              ? `${description.substring(0, 149)} ...`
              : description}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default TicketCard;
