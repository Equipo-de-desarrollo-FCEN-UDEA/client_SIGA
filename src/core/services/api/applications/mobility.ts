import Mobility from '@/core/interfaces/applications/mobility/mobility';
import {AbstractCRUD} from '@/core/services/api/CRUD';
import { error } from 'console';
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
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error
        }
    }
}

export default MobilityCRUD;