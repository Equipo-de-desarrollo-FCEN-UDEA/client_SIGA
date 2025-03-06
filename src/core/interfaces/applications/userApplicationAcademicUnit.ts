import { UUID } from "crypto";
import UserApplication from "./userApplication";
import AcademicUnit from "@/core/interfaces/academicUnit";

export const ResultOptions = {
    APPROVED: "APROBADO",
    REJECTED: "RECHAZADO",
  };
  

interface UserApplicationAcademicUnit {
  academic_unit_id: UUID;
  is_active: boolean;
    user_application: UserApplication;
    academic_unit: AcademicUnit;
}

export default UserApplicationAcademicUnit;