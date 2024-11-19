import { UUID } from 'crypto';
import VoteType from './voteType';

interface Vote {
    vote_type: VoteType;
}

export default Vote;