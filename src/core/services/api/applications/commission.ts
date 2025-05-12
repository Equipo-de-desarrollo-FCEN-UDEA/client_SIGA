import { Commission } from '@/core/interfaces/applications/comission/commission';
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
}

export default CommissionCRUD;
