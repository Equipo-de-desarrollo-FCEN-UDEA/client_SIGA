import User from "@/core/interfaces/user";
import Application from "@/core/interfaces/applications/application";
import UserApplicationAcademicUnit from "@/core/interfaces/applications/userApplicationAcademicUnit";
import { UUID } from "crypto";

interface Status {
    name: string;
    description: string;
}

export interface UserApplicationStatus {
    status: Status
    user: User;
    observation: string | null;
    created_at: Date;
}

interface Document{
    name: string;
    url: string;
}

interface UserApplication {
    id: UUID;
    application: Application;
    user: User;
    user_application_academic_units: UserApplicationAcademicUnit[];
    user_application_status: UserApplicationStatus[];
    created_at: Date;
    documents: Document[];
}

export default UserApplication;