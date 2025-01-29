export const forgotPasswordService = async (email_or_id: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(
            `${apiUrl}/auth/pasword-recovery/${email_or_id}`,
            {
                method: 'POST',
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {email_or_id} )
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
 catch (error) {
    console.error("Error al solicitar el cambio de contraseña: ", error);
    throw error;
}

};