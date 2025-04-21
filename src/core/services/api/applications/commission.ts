import { Commission } from '@/core/interfaces/applications/comission/commission';
import { AbstractCRUD } from '@/core/services/api/CRUD';


class CommissionCRUD extends AbstractCRUD<Commission> {
  apiUrl = process.env.NEXT_PUBLIC_API_URL + '/commission';
}

export default CommissionCRUD;
