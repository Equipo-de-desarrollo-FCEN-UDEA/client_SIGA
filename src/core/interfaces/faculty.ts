import AcademicUnit from "./academicUnit";
import AcademicUnitType from "./academicUnitType";

interface Faculty {
  id: string;
  name: string;
  academic_unit_type: AcademicUnitType;
  academic_units: AcademicUnit[];
}

export default Faculty;
