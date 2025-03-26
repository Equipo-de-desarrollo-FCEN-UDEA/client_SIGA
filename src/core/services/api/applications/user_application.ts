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

    async getToAcademicUnit(academicUnitId: UUID) {
        const response = await fetch(`${this.apiUrl}/academic_unit/${academicUnitId}`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async getNextStep(userApplicationId: UUID, currentStep: number) {
        const response = await fetch(`${this.apiUrl}/next_step/${userApplicationId}?current_step=${currentStep}`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async advanceStatus(userApplicationId: UUID) {
        const response = await fetch(`${this.apiUrl}/${userApplicationId}/next`, {
            method: 'POST',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async uploadFiles(files: File[], userApplicationId: UUID) {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });
        const response = await fetch(`${this.apiUrl}/upload/${userApplicationId}`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

}

export default UserApplicationService;