export const forgotPasswordService = async (email_or_id: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables");
    }

    try {
        const response = await fetch(
            `${apiUrl}/auth/password-recovery/${email_or_id}`, // Ajusta la URL aquí
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_or_id }) // Asegúrate de enviar un objeto
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        alert("Error al solicitar el cambio de contraseña: " + error);
        throw error;
    }
};