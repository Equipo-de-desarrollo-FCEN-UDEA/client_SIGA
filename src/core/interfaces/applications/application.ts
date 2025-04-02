import { UUID } from "crypto";

interface Application {
    name: string;
    despcription: string;
    academic_unit_id: string;
    id: UUID;
}

export default Application;