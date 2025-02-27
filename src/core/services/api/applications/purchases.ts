import { AbstractCRUD } from '@/core/services/api/CRUD';
import {Purchase} from '@/core/interfaces/applications/purchases/Purchase';

class PurchaseService extends AbstractCRUD<Purchase> {
    apiUrl = process.env.NEXT_PUBLIC_API_URL + '/purchase';
}

export default PurchaseService;