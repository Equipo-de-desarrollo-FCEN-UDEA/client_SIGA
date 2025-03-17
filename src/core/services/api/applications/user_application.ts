import { AbstractCRUD } from '@/core/services/api/CRUD';
import UserApplication from '@/core/interfaces/applications/userApplication';
import { UUID } from 'crypto';

class UserApplicationService extends AbstractCRUD<UserApplication> {
    apiUrl = process.env.NEXT_PUBLIC_API_URL + '/user_application';

    async downloadDocument(userId: UUID, userApplicationId: UUID, document: string) {
        const response = await fetch(`${this.apiUrl}/get_document/?user_id=${userId}&user_application_id=${userApplicationId}&document_name=${document}`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        window.open(blobUrl, '_blank');
        
    }
}

export default UserApplicationService;