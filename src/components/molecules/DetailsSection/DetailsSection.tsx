import AttachmentList from "@/components/atoms/attachmentList/AttachmentList";
import { LabelValue } from "@/components/atoms/label/LabelValue";
import { Commission } from "@/core/interfaces/applications/comission/commission";
import React from "react";


interface DetailsSectionProps {
  data: Commission;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ data }) => {
  return (
    <div className="">
      <div className="grid grid-cols-3 gap-5">
        <LabelValue label="País" value={data.country} />
        <LabelValue label="Estado/Departamento" value={data.state} />
        <LabelValue label="Ciudad" value={data.city} />
      </div>

      {/* Dates */}
      <LabelValue label="Fechas" value={`${data.date_start} - ${data.date_end}`} />

      {/* Reason */}
      <LabelValue label="Motivo de la comisión" value={data.reason} />

      <LabelValue label="Justificación" value={data.justification} />

      <AttachmentList documents={data.documents} />

    </div>
  );
};

export default DetailsSection;
