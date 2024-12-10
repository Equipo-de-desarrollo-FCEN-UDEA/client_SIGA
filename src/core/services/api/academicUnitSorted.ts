import { getFilteredAcademicUnits, getFilteredInstitutes } from "@/utils/getFilteredAcademicUnits";

export const fetchAcademicUnitsSorted = async () => {
  try {
    const response = await fetch(
      "http://localhost:8003/api/v1/academic_unit/adb1ea44-189f-47a7-b763-e0aae6e7c07e"
    );

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
    console.error("Error al obtener las unidades académicas:", error);
    throw error;
  }
};
