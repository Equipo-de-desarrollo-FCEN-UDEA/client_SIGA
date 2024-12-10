export const fetchVotingById = async (id: string | string[]) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const voting_response = await fetch(
        apiUrl+`/api/v1/voting/${id}`, {
            credentials: "include",
        }
        );
        if (voting_response.status === 401) {
            return (401);
        }
        const data_voting = await voting_response.json();
    
        return data_voting;
    } catch (error) {
        console.error("Error al obtener la votación: ", error);
    }
};