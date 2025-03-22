export const logout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${apiUrl}/auth/logout`, {
            method: "POST",
            credentials: "include", // Incluye las cookies para invalidar la sesión
        });

        if (!response.ok) {
            throw new Error("Error al cerrar sesión");
        }

        return response;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
