import Status from "@/core/interfaces/status";

const InfoStatus = (status: Status) => {

    const date = new Date(status.date);

    const formattedDate = date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
    <>
        <div className="flex flex-row justify-between">
            <div className="mb-2">
                <p className="text-xs text-gray-400">Status</p>
                <p className="mb-1">{status.result}</p>
            </div>
            <div className="mb-2">
                <p className="text-xs text-gray-400">Observación</p>
                <p className="mb-1">{status.observation}</p>
            </div>
            <div className="mb-2">
                <p className="text-xs text-gray-400"> Fecha</p>
                <p className="mb-1">{formattedDate}</p>
            </div>
        </div>
    </>
      
    );
  };
  
  export default InfoStatus;