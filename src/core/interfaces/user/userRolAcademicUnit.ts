import User from "@/core/interfaces/user";
import Rol from "@/core/interfaces/rol";
import AcademicUnit from "@/core/interfaces/academicUnit";

interface UserRolAcademicUnit {
    user: User;
    rol: Rol;
    academic_unit: AcademicUnit;
}

export default UserRolAcademicUnit;