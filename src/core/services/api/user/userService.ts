export const getSession = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${apiUrl}/user/session/me`, {
            method: "GET",
            credentials: "include",
        });

        // Verificar si la respuesta es un error antes de intentar parsear JSON
        if (!response.ok) {
            let errorMessage = `Error HTTP ${response.status}`;
            
            // Verificar si la respuesta es JSON antes de leerla
            const contentType = response.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || errorMessage;
            }

            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        // Mostrar un mensaje de advertencia en vez de error en consola para evitar logs excesivos
        console.warn("No se pudo recuperar la sesión. Inténtalo más tarde.");
        return null;
    }
};
