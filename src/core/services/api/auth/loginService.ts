export const auth = async (credentials: { username: string; password: string }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);
    try {
        const response = await fetch(`${apiUrl}/auth/access-token`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });
        return response;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}