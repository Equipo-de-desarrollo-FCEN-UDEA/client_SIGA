import UserRolAcademicUnit from '@/core/interfaces/user/userRolAcademicUnit';
import { AbstractCRUD } from '@/core/services/api/CRUD';
import { UUID } from 'crypto';


class UserRolAcademicUnitService extends AbstractCRUD<UserRolAcademicUnit> {
    apiUrl = process.env.NEXT_PUBLIC_API_URL + '/user_rol_academic_unit';

    async det_axiliaries_by_academic_unit(academic_unit_id: UUID) {
        const rolName = 'AUXILIAR';
        const response = await fetch(`${this.apiUrl}/${academic_unit_id}/?rol_name=${rolName}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    
    }
}

export default UserRolAcademicUnitService;