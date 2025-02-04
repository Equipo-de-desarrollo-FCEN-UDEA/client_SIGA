export const getSession = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${apiUrl}/user/session/me`, {
            method: "GET",
            credentials: "include",
        });
        return response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}