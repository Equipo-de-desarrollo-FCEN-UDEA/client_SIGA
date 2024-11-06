import { UUID } from 'crypto';
import Status from './status';

interface InfoVoting {
    id_postgres: UUID;
    statuses: Status[];
}

export default InfoVoting;