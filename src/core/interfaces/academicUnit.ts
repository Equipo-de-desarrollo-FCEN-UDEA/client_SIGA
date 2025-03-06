import { UUID } from 'crypto';
import AcademicUnitType from './academicUnitType'

interface AcademicUnit {
  id: UUID;
  name: string;
  academic_unit_type: AcademicUnitType;
  academic_units?: AcademicUnit[];
}

export default AcademicUnit;