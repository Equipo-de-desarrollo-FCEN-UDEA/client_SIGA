export const createUser = async (
  requestBody: Record<string, unknown>,
  queryParams: URLSearchParams
) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(
      `${apiUrl}/user?${queryParams.toString()}`,
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
    throw new Error((error as Error).message);
  }
};
