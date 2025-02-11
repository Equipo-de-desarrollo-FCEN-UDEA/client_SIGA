import Mobility from '@/core/interfaces/applications/mobility/mobility';
import {AbstractCRUD} from '@/core/services/api/CRUD';
const apiUrl = process.env.NEXT_PUBLIC_API_URL+'/mobility';

class MobilityCRUD extends AbstractCRUD<Mobility> {
    apiUrl = apiUrl;

    async sendToCommittee(id: string) {
        try {
            const response = await fetch(`${this.apiUrl}/update/${id}`, {
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
            console.error('Error fetching data:', error);
            throw error
        }
    }
}

export default MobilityCRUD;