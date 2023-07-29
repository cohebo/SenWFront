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
  playerId: string;
  playerName: string;
  locationX?: number;
  locationY?: number;
  avatar?: string;
  wins?: number;
  loses?: number;
  draws?: number;
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

export interface GameCreatedModel {
    name: string;
    players?: Array<PlayerModel>;
    game?: GameModel;
    active: boolean;
}

export interface GameModel {
    gameId: number;
    name: string;
    image: string;
    title?: string;
    description?: string;
    state?: boolean;
    count?: number;
}

export interface UselessBoxMakeProgressModel {
  groupId: string;
  gameId: number;
}

export interface UselessBoxProgressModel {
  // todo: fix backend frontend problem where gamestate gets set null. for now, set gameId too.
  gameId: number;
  state: boolean;
  count: number;
}

export interface GetChatMessageModel {
  groupId: string;
  playerId: string;
  message: string;
}
