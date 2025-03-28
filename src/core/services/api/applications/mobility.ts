import Mobility, { MobilityRequest } from '@/core/interfaces/applications/mobility/mobility';
import { AbstractCRUD } from '@/core/services/api/CRUD';
import { UUID } from 'crypto';
const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/mobility';

class MobilityCRUD extends AbstractCRUD<Mobility> {
    apiUrl = apiUrl;

    async sendToCommittee(id: string) {
        const response = await fetch(`${this.apiUrl}/update/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json
    }

    async advanceMobilityStatus(id: UUID, request: MobilityRequest, isApprove: boolean) {
        const response = await fetch(`${this.apiUrl}/${id}/next?is_approved=${isApprove}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json;
    }

}

export default MobilityCRUD;