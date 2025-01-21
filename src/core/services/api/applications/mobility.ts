import Mobility from '@/core/interfaces/applications/mobility/mobility';
import {AbstractCRUD} from '@/core/services/api/CRUD';
const apiUrl = process.env.NEXT_PUBLIC_API_URL+'/mobility';

class MobilityCRUD extends AbstractCRUD<Mobility> {
    apiUrl = apiUrl;
}

export default MobilityCRUD;