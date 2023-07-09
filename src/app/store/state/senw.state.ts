import { Group } from "src/app/models/group";
import { Player } from "src/app/models/player";

export const featureKey = "senw";

export interface State {
    groupName: string;
    groupId: string;
    groups: Array<Group>,
    playerName: string;
    playerId: string;
    player: Array<Player>,
}