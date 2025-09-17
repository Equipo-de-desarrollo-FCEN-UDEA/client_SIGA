export const fetchUserById = async (id: string | string[]) => {
  try {
    const user_response = await fetch(
      `http://localhost:8003/api/v1/user/${id}`,
      {
        credentials: 'include',
      }
    );
    const data_user = await user_response.json();

    return data_user;
  } catch (error) {
    console.error("Error al obtener al usuario: ", error);
  }
};

export const fetchCurrentUser = async () => {
  try {
    // First check if user is authenticated
    const authResponse = await fetch('http://localhost:8003/api/v1/auth/protected', {
      credentials: 'include',
    });
    
    if (!authResponse.ok) {
      return null;
    }
    
    const authData = await authResponse.json();
    
    // If authenticated, get full user details
    if (authData.id) {
      return await fetchUserById(authData.id);
    }
    
    return authData;
  } catch (error) {
    console.error("Error al obtener usuario actual: ", error);
    return null;
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
