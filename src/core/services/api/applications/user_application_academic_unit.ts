
class UserApplicationAcademicUnitService {
  apiUrl = process.env.NEXT_PUBLIC_API_URL+'/user_application_academic_unit';

async getUserApplicationAcademicUnitByAcademicUnit(academic_unit_id: string) {
    try {
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
    }catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
  }
}

export default UserApplicationAcademicUnitService;

