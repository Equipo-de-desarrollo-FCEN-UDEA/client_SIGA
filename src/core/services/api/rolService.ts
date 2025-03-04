const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const fetchRoles = async () => {
  try {
    const response_roles = await fetch(
      apiUrl+"/rol/get-all?skip=0&limit=10"
    );
    const data_roles = await response_roles.json();

    return data_roles;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
