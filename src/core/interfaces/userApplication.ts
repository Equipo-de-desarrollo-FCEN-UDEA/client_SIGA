import {UUID} from "crypto";
import Application from "./application";
import User from "./user";

interface UserApplication {
    user_id: UUID;
    application_id: UUID;
    id: UUID;
    created_at: Date;
    updated_at: Date;
    application: Application;
    user: User;
}

export default UserApplication;