export const resetPasswordService = async (new_password: string, token: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(
            `${apiUrl}/auth/reset-password/`,
            {
                method: 'POST',
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, new_password })
            });

        if (!response.ok) {
            const errorData = await response.json();
            alert("Error details: " + JSON.stringify(errorData));
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Error al resetear la contraseña: " + error);
        throw error;
    }
};