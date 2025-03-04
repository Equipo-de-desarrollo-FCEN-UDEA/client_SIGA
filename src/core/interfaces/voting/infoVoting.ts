import { UUID } from 'crypto';
import Status from '@/core/interfaces/status';

interface InfoVoting {
    id_postgres: UUID;
    statuses: Status[];
}

export default InfoVoting;