class UserApplicationAcademicUnitService {
    apiUrl = process.env.NEXT_PUBLIC_API_URL + '/user_application_academic_unit';

    async getUserApplicationAcademicUnitByAcademicUnit(academic_unit_id: string) {
        const response = await fetch(`${this.apiUrl}/get/${academic_unit_id}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Resource not found');
            }
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    async response(user_application_id: string, academic_unit_id: string, result: string) {
        const response = await fetch(`${this.apiUrl}/response/${user_application_id}/${academic_unit_id}?result=${result}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json;
    }

    async getActive(user_application_id: string) {
        const response = await fetch(`${this.apiUrl}/get/active/${user_application_id}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Resource not found');
            }
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
}

export default UserApplicationAcademicUnitService;
