import { Group } from "src/app/models/group";

// GroupModel

export interface CreateGroupModel {
    groupName: string;
    playerId: string;
  }

export interface GroupCreatedModel {
    groupId: string;
    groupName: string;
    players: Array<PlayerModel>
    groupLeaderId: string;
}

export interface GroupModel {
  groupId: string,
  groupName: string,
  gameLobby: null,
  playedGames: null,
  players: Array<PlayerModel>,
  groupLeaderId: string,
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
  // gamesPlayed: null,
  // wins: null,
  // loses: null,
  // draws: null,
  locationX: number,
  locationY: number,
}

export interface JoinGroupModel {
  groupId: string;
  playerId: string;
}

export interface CreateGameModel {
  gameName: string;
  groupId: string;
}


export interface GroupJoinedModel {
  groupId: string;
  groupName: string;
  players: Array<PlayerModel>
  groupLeaderId: string;
}