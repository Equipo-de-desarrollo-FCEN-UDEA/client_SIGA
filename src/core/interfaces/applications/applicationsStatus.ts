import { UUID } from "crypto";

interface UserApplicationStatus {
    name: string;
    updated_by: UUID;
    date: Date;
}

export default UserApplicationStatus;