import { Group } from "src/app/models/group";

// GroupModel

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

// PlayerModel

export interface CreatePlayerModel {
  playerName: string,
  locationX: number,
  locationY: number,
}

export interface PlayerCreatedModel {
  playerId: string,
  playerName: string,
  locationX: number,
  locationY: number,
}

// loses veranderen in losses
//deze model of die hierboven.. merge dingetje

export interface PlayerModel {
  playerId: string,
  playerName: string,
  gamesPlayed: null,
  wins: null,
  loses: null,
  draws: null,
  locationX: number,
  locationY: number,

export interface PlayerModel {
  playerId: string,
  playerName: string,
  Avatar: string,
  Wins: number,
  Loses: number,
  Draws: number,

}