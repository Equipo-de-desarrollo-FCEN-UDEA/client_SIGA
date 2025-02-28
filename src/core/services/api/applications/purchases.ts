import { AbstractCRUD } from '@/core/services/api/CRUD';
import { Purchase } from '@/core/interfaces/applications/purchases/Purchase';
import { UUID } from 'crypto';

class PurchaseService extends AbstractCRUD<Purchase> {
    apiUrl = process.env.NEXT_PUBLIC_API_URL + '/purchase';

    async create(data: Purchase, academicUnitId?: UUID) {
        const response = await fetch(this.apiUrl + `/create?academic_unit_id=${academicUnitId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                ...data,
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
}

export default PurchaseService;