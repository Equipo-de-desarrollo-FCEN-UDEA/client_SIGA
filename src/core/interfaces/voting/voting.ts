import {UUID} from "crypto";
import UserApplication from "@/core/interfaces/applications/userApplication";
import InfoVoting from "./infoVoting";
import Vote from "./vote";

interface Voting {
  id: UUID;
  academic_unit_id: UUID;
  created_at: Date;
  updated_at: Date;
  user_application: UserApplication;
  info_voting: InfoVoting;
  votes: Vote[]
}

export default Voting;