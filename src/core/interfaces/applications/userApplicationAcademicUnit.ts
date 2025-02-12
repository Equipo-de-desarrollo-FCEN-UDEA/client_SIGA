import { UUID } from "crypto";
import UserApplication from "./userApplication";

export const ResultOptions = {
    APPROVED: "APROBADO",
    REJECTED: "RECHAZADO",
  };
  

interface UserApplicationAcademicUnit {
    academic_unit_id: UUID;
    is_active: boolean;
    user_application: UserApplication;
}

export default UserApplicationAcademicUnit;