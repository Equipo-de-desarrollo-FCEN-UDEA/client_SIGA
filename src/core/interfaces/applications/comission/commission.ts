import UserApplicationStatus from "@/core/interfaces/applications/applicationsStatus";
import { UUID } from "crypto";

export interface Commission {
  id?: UUID;
  country: string;
  state: string;
  city: string;
  date_start: string;
  date_end: string;
  reason: string;
  justification: string;
  status: UserApplicationStatus[];
  documents: File[];
}
