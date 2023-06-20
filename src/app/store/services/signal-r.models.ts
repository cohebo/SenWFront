import { Group } from "src/app/models/group";

export interface CreateGroupModel {
    groupName: string;
  }

export interface GroupCreatedModel {
    groupId: string;
    groupName: string;
}

export interface GroupModel {
  groupId: string,
  groupName: string,
  gameLobby: null,
  playedGames: null,
  players: null,
  groupLeader: null,
}

export interface PlayerModel {
  playerId: string,
  playerName: string,
  Avatar: string,
  Wins: number,
  Loses: number,
  Draws: number,
}