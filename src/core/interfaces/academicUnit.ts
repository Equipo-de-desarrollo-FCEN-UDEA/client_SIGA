import AcademicUnitType from './academicUnitType'

interface AcademicUnit {
  id: string;
  name: string;
  academic_unit_type: AcademicUnitType;
  academic_units?: AcademicUnit[];
}

export default AcademicUnit;