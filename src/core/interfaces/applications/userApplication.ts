import User from "@/core/interfaces/user";
import Application from "@/core/interfaces/applications/application";

interface UserApplication {
    user_id: string;
    application_id: string;
    id: string;
    created_at: string;
    updated_at: string;
    application: Application;
    user: User;
}

export default UserApplication;