import ProcessEnum from "@/core/interfaces/applications/mobility/process";
import MobilityType from "@/core/interfaces/applications/mobility/type";
import MobilityPurpose from "@/core/interfaces/applications/mobility/purpose";
import Subject from "@/core/interfaces/applications/mobility/subject";
import UserApplicationStatus from "@/core/interfaces/applications/applicationsStatus";
import { UUID } from "crypto";

interface Mobility {
    id: UUID;
    process: ProcessEnum;
    type: MobilityType;
    purpose: MobilityPurpose;
    destination_country: string;
    destination_institution: string;
    academic_program: string;
    name_contact_person: string;
    cellphone_contact_person: string;
    email_contact_person: string;
    date_start: string;
    date_end: string;
    total_time: number;
    date_report: string;
    subjects: Subject[];
    status: UserApplicationStatus[];
}

export default Mobility;