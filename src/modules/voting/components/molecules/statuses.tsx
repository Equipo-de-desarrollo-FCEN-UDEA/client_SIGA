import InfoStatus from "../atoms/status";
import Status from "@/core/interfaces/status";

interface StatusesProps {
  statuses: Status[];
}

const Statuses: React.FC<StatusesProps> = ({ statuses }) => (
      <div className="p-4 md:p-6 lg:p-8">
        <h2 className="text-lg font-bold mb-3">Historial de estados</h2>
        {statuses.map((status, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <InfoStatus {...status} />
          </div>
        ))}
      </div>
    );
  
  export default Statuses;