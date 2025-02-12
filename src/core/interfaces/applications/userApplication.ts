import User from "@/core/interfaces/user";
import Application from "@/core/interfaces/applications/application";

interface UserApplication {
    id: string;
    application: Application;
    user: User;
}

export default UserApplication;