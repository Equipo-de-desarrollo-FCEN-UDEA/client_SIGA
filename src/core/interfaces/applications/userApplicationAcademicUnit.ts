import { UUID } from "crypto";
import UserApplication from "./userApplication";

interface UserApplicationAcademicUnit {
    academic_unit_id: UUID;
    is_active: boolean;
    user_application: UserApplication;
}

export default UserApplicationAcademicUnit;