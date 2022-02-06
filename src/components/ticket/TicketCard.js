// Components
import Link from "next/link";
import Stamp from "./Stamp";

const TicketCard = ({ id, title, description, priority, assignedBy }) => {
  return (
    <Link href={`/tickets/${id}`}>
      <a className="col-span-2">
        <div className="h-full cursor-pointer bg-white p-10px shadow-sm hover:shadow-md">
          <div className="border-b border-solid border-black/5 pb-10px">
            <div className="flex justify-between">
              <h2 className="flex-auto truncate font-semibold text-cod-gray">
                {title}
              </h2>
              <Stamp type={priority} />
            </div>

            <div>
              <span className="mt-1 text-dodger-blue">Assigned By:</span>{" "}
              {assignedBy}
            </div>
          </div>

          <p className="mt-10px break-words">
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
