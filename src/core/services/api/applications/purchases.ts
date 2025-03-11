import { AbstractCRUD } from '@/core/services/api/CRUD';
import { Purchase, PurchaseComplete } from '@/core/interfaces/applications/purchases/Purchase';
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

    async uploadFiles(files: File[], purchaseId: UUID) {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });
        const response = await fetch(this.apiUrl + `/upload/${purchaseId}`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async assing_auxiliary(userID: UUID | null , purchaseID: UUID, isApprove: boolean) {
        const url = this.apiUrl + `/send/user/${purchaseID}/?is_approved=${isApprove}` + (userID ? `&user_id=${userID}` : '');
        const response = await fetch(url, {
            method: 'PATCH',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async completePurchase(purchaseID: UUID, isApprove: boolean, data: PurchaseComplete) {
        const url = this.apiUrl + `/complete/${purchaseID}/?is_approved=${isApprove}`;
        const response = await fetch(url, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async downloadFormat(purchaseID: UUID) {
        const response = await fetch(this.apiUrl + `/generate-purchase-form/${purchaseID}`, {
            method: 'POST',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formato-solicitud-compra.docx';
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);

        return blob;
    }

}

export default PurchaseService;