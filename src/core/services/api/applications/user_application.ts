import { AbstractCRUD } from '@/core/services/api/CRUD';
import UserApplication from '@/core/interfaces/applications/userApplication';

class UserApplicationService extends AbstractCRUD<UserApplication> {
    apiUrl = process.env.NEXT_PUBLIC_API_URL + '/user_application';
}

export default UserApplicationService;