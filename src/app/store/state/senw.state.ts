import { GameLobby } from "src/app/models/gamelobby";
import { Group } from "src/app/models/group";
import { Player } from "src/app/models/player";
import { Message } from "src/app/models/message";

export const featureKey = "senw";

export interface State {
    groupName: string;
    groupId: string;
    groups: Array<Group>,
    groupLeaderId: string;
    players: Array<Player>;
    playerName: string;
    playerId: string;
//player nodig?
    player: Player;
    locationX: number;
    locationY: number;
    gamelobby: GameLobby;
    message: string;
    chatHistory: Array<Message>;

}