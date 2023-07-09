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
  playerName: string;
}

export interface PlayerCreatedModel {
  playerId: string;
  playerName: string;
}

// loses veranderen in losses

export interface PlayerModel {
  playerId: string,
  playerName: string,
  gamesPlayed: null,
  wins: null,
  loses: null,
  draws: null,
  recentLocation: null,
}