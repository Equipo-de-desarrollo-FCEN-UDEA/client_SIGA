import ProcessEnum from "@/core/interfaces/applications/mobility/process";
import MobilityType from "@/core/interfaces/applications/mobility/type";
import MobilityPurpose from "@/core/interfaces/applications/mobility/purpose";

interface Subject {
    extern_code: string
    extern_name: string
    intern_code: string
    intern_name: string
}

interface Mobility {
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
}

export default Mobility;