export const fetchAcademicUnits = async () => {
  try {
    const academic_unit_response = await fetch(
      "http://localhost:8003/api/v1/academic_unit/get-all?skip=0&limit=50"
    );
    const data_academic_unit = await academic_unit_response.json();

    return data_academic_unit;
  } catch (error) {
    console.error("Error obteniendo las unidades académicas: " + error);
  }
};
