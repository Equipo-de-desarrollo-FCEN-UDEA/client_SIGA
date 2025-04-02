export const getSession = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/user/session/me`, {
        method: "GET",
        credentials: "include",
    });
    // Verificar si la respuesta es un error antes de intentar parsear JSON
    if (!response.ok) {
        let errorMessage = `Error HTTP ${response.status}`;

        // Verificar si la respuesta es JSON antes de leerla
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorData.message || errorMessage;
        }

        throw new Error(errorMessage);
    }

    return await response.json();
};
