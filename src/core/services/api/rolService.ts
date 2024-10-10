export const fetchRoles = async () => {
  try {
    const response_roles = await fetch(
      "http://localhost:8003/api/v1/rol/get-all?skip=0&limit=10"
    );
    const data_roles = await response_roles.json();

    return data_roles;
  } catch (error) {
    console.error("Error obteniendo los roles: " + error);
  }
};
