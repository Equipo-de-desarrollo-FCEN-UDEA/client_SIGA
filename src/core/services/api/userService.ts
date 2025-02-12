const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchUserById = async (id: string | string[]) => {
  try {
    const user_response = await fetch(
      apiUrl+`/user/${id}`
    );
    const data_user = await user_response.json();

    return data_user;
  } catch (error) {
    console.error("Error al obtener al usuario: ", error);
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
      const responseData = await response.json();
      console.log("Datos enviados con éxito: ", responseData);
      window.location.reload();
    }

    return response;
  } catch (error) {
    console.error("Error al asignar rol al usuario: ", error);
  }
};
