import { UUID } from "crypto";
import RolAcademicUnit from "./rolAcademicUnit";

interface User {
  name: string;
  last_name: string;
  email: string;
  identification_type: string;
  identification_number: string;
  phone: string;
  is_active: boolean;
  id: UUID;
  user_roles_academic_units: RolAcademicUnit[];
}

export default User;