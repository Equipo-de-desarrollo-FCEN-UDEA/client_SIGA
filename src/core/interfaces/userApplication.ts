import {UUID} from "crypto";
import Application from "./application";
import User from "./user";
import UserApplicationAcademicUnit from "@/core/interfaces/applications/userApplicationAcademicUnit";

interface UserApplication {
    user_id: UUID;
    application_id: UUID;
    id: UUID;
    created_at: Date;
    updated_at: Date;
    application: Application;
    user: User;
    user_application_academic_units: UserApplicationAcademicUnit[];
}

export default UserApplication;