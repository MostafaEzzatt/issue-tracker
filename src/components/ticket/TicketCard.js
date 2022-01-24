// Components
import Link from "next/link";
import Stamp from "./Stamp";

const TicketCard = ({ id, title, description, priority, assignedBy }) => {
  return (
    <Link href={`tickets/${id}`}>
      <a className="col-span-2 ">
        <div className="p-10px shadow-sm hover:shadow-md cursor-pointer bg-white">
          <div className="pb-10px border-b border-solid border-black/5">
            <div className="flex justify-between">
              <h2 className="font-semibold text-cod-gray flex-auto truncate">
                {title}
              </h2>
              <Stamp type={priority} />
            </div>

            <div>
              <span className="text-dodger-blue mt-1">Assigned By:</span>{" "}
              {assignedBy}
            </div>
          </div>

          <p className="mt-10px break-words">
            {description.length > 300
              ? `${description.substring(0, 299)} ...`
              : description}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default TicketCard;
