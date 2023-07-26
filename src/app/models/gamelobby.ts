import { Game } from "./game";
import { Player } from "./player";

export interface GameLobby {
    name: string;
    players?: Array<Player>;
    game?: Game | null;
    active?: boolean;
}