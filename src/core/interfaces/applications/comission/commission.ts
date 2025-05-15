import { UUID } from "crypto";

export interface CommissionRequest {
  academic_unit_id: UUID | null;
}

interface Commission {
  id?: UUID;
  country: string;
  state: string;
  city: string;
  date_start: string;
  date_end: string;
  reason: string;
  justification: string;
  documents: File[];
}

export default Commission;
