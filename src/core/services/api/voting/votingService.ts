export const fetchVotingById = async (id: string | string[]) => {
    try {
        const voting_response = await fetch(
        `http://localhost:8003/api/v1/voting/${id}`, {
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