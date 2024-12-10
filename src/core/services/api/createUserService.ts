export const createUser = async (
  requestBody: Record<string, any>,
  queryParams: URLSearchParams
) => {
  try {
    const response = await fetch(
      `http://localhost:8003/api/v1/user?${queryParams.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};
