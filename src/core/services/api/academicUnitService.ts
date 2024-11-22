const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const fetchAcademicUnits = async () => {
  try {
    const academic_unit_response = await fetch(
      apiUrl+"/api/v1/academic_unit/get-all?skip=0&limit=50"
    );
    const data_academic_unit = await academic_unit_response.json();

    return data_academic_unit;
  } catch (error) {
    console.error("Error obteniendo las unidades académicas: " + error);
  }
};
