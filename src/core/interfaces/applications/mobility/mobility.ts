import ProcessEnum from "@/core/interfaces/applications/mobility/process";
import MobilityType from "@/core/interfaces/applications/mobility/type";
import MobilityPurpose from "@/core/interfaces/applications/mobility/purpose";

interface Mobility {
    process: ProcessEnum;
    type: MobilityType;
    purpose: MobilityPurpose;
    destination_country: string;
    destination_institution: string;
    date_start: string;
    date_end: string;
    total_time: number;
    date_report: string;
}

export default Mobility;