import { Player } from "./player";

export interface Group {
  groupId: string;
  groupName: string;
  gameLobby: null;
  playedGames: null;
  players: null | Array<Player>;
  groupLeaderId: string;
}