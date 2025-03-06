import Faculty from "@/core/interfaces/faculty";
import { UUID } from "crypto";

function getFilteredAcademicUnits(faculty: Faculty, filterWord: string): { name: string; id: UUID }[] {
  return faculty.academic_units
    .filter((unit) =>
      unit.academic_units && unit.academic_units.some(subUnit => subUnit.academic_unit_type.name === filterWord)
    )
    .flatMap((unit) =>
      unit.academic_units
        ?.filter((subUnit) => subUnit.academic_unit_type.name === filterWord)
        .map((subUnit) => ({ name: subUnit.name, id: subUnit.id }))
    )
    .filter((unit): unit is { name: string; id: UUID } => unit !== undefined);
}

function getFilteredInstitutes(faculty: Faculty): { name: string; id: string }[] {
  return faculty.academic_units
    .map((unit) => ({ name: unit.name, id: unit.id }))
};

export { getFilteredAcademicUnits, getFilteredInstitutes };
