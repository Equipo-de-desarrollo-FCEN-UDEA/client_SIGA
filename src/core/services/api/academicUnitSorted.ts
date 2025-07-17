import { getFilteredAcademicUnits, getFilteredInstitutes } from "@/utils/getFilteredAcademicUnits";

export const fetchAcademicUnitsSorted = async (
  facultyId: "FACULTAD DE CIENCIAS EXACTAS" | "FACULTAD DE CIENCIAS SOCIALES Y HUMANAS"
) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
  const facultyOptions = {
    "FACULTAD DE CIENCIAS EXACTAS": "adb1ea44-189f-47a7-b763-e0aae6e7c07e",
    "FACULTAD DE CIENCIAS SOCIALES Y HUMANAS": "e5a90438-fc83-4c1d-bcd3-f94edf109728"
  };
    const response = await fetch(`${apiUrl}/academic_unit/${facultyOptions[facultyId]}`);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      undergraduate: getFilteredAcademicUnits(data, "PREGRADO"),
      postgraduate: getFilteredAcademicUnits(data, "POSGRADO"),
      institute: getFilteredInstitutes(data),
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
