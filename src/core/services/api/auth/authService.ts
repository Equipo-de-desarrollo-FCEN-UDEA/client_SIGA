export const activateAccount = async (token: string) => {
    console.log("Activando cuenta con token:", token);
    try {
        const response = await fetch(
            `http://localhost:8003/api/v1/auth/activate-account/`, 
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: token
            }
        
        );
        console.log("Respuesta del servidor:", response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al activar la cuenta: ", error);
    }
};