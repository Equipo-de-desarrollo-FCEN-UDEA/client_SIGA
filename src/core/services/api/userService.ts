const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchUserById = async (id: string | string[]) => {
  try {
    const user_response = await fetch(
      apiUrl+`/user/${id}`
    );
    const data_user = await user_response.json();

    return data_user;
  } catch {
    throw new Error(`Error al obtener al usuario`);
  }
};

export const assignRoleToUser = async (userData: string) => {
  try {
    const response = await fetch(
      apiUrl+"/user_rol_academic_unit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      }
    );
    
    if (response.ok) {
      await response.json();
      // console.log("Datos enviados con éxito: ", responseData);
      window.location.reload();
    }

    return response;
  } catch (error) {
    throw new Error(`Error al asignar rol al usuario: ${(error as Error).message}`);
  }
};
