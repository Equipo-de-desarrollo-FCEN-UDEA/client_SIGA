export const fetchUserById = async (id: string | string[]) => {
  try {
    const user_response = await fetch(
      `http://localhost:8003/api/v1/user/${id}`
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
      "http://localhost:8003/api/v1/user_rol_academic_unit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
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
