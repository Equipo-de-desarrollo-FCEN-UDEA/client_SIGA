import { UUID } from "crypto";

interface Application {
    id: UUID;
    name: string;
    description: string;
    academic_unit_id: UUID;
}

export default Application;