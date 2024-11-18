export const activateAccount = async (token: string) => {
    try {
        const response = await fetch(
            'http://localhost:8003/api/v1/auth/activate-account/', 
            {
                method: 'POST',
                // credentials: 'include',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( token )
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al activar la cuenta: ", error);
    }
};