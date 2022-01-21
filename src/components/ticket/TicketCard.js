// Components
import Stamp from "./Stamp";

const TicketCard = ({ title, description, priority, assignedBy }) => {
  return (
    <div className="col-span-2 p-10px shadow-sm hover:shadow-md cursor-pointer bg-white">
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

      <p>{description}</p>
    </div>
  );
};

export default TicketCard;
