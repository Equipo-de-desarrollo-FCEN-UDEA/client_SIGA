import { getFilteredAcademicUnits, getFilteredInstitutes } from "@/utils/getFilteredAcademicUnits";

export const fetchAcademicUnitsSorted = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(
      `${apiUrl}/academic_unit/adb1ea44-189f-47a7-b763-e0aae6e7c07e`
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
    throw new Error((error as Error).message);
  }
};
