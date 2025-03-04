export const fetchVotingById = async (id: string | string[]) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const voting_response = await fetch(
        apiUrl+`/voting/${id}`, {
            credentials: "include",
        }
        );
        if (voting_response.status === 401) {
            return (401);
        }
        const data_voting = await voting_response.json();
    
        return data_voting;
    } catch (error) {
        throw new Error(`Error al obtener la votación: ${error}`);
    }
};

import Voting from '@/core/interfaces/voting/voting';
import {AbstractCRUD} from '@/core/services/api/CRUD';

class VotingService extends AbstractCRUD<Voting> {
    apiUrl = process.env.NEXT_PUBLIC_API_URL+'/voting';

    async closeVoting(id: string) {
        try {
            const response = await fetch(`${this.apiUrl}/close/${id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json
        }
        catch (error) {
            // Handle the error appropriately
            throw new Error(`Error fetching data: ${(error as Error).message}`);
        }
    }
}

export default VotingService;