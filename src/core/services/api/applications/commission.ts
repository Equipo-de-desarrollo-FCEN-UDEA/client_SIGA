import Commission, { CommissionRequest }  from '@/core/interfaces/applications/comission/commission';
import { AbstractCRUD } from '@/core/services/api/CRUD';
import { UUID } from 'crypto';


class CommissionCRUD extends AbstractCRUD<Commission> {
    apiUrl = process.env.NEXT_PUBLIC_API_URL + '/commission';

    async create(data: FormData, academicUnitId?: UUID) {
        const response = await fetch(this.apiUrl + `/create?academic_unit_id=${academicUnitId}`, {
            method: 'POST',
            credentials: 'include',
            body: data,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

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

    async advanceCommissionStatus(id: UUID, request: CommissionRequest, isApprove: boolean) {
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

export default CommissionCRUD;
