import InfoStatus from "../atoms/status";
import Status from "@/core/interfaces/status";

interface StatusesProps {
  statuses: Status[];
}

const Statuses: React.FC<StatusesProps> = ({ statuses }) => {
    return (
      <div>
        <h2 className="text-lg font-bold mb-3">Historial de estados</h2>
          {statuses.map((status, index) => (
              <InfoStatus key={index} {...status} />
          ))}
      </div>
    );
  };
  
  export default Statuses;