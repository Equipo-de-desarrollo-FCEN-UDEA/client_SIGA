export const fetchVotingById = async (id: string | string[]) => {
    try {
        const voting_response = await fetch(
        `http://localhost:8003/api/v1/voting/${id}`, {
            credentials: "include",
        }
        );
        const data_voting = await voting_response.json();
    
        return data_voting;
    } catch (error) {
        console.error("Error al obtener la votación: ", error);
    }
};