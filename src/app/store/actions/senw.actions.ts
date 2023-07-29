// connections

import { createAction, props } from "@ngrx/store";
import { GameCreatedModel, GroupCreatedModel, GroupJoinedModel, GroupModel, PlayerCreatedModel, UselessBoxProgressModel } from "../services/signal-r.models";

export const startConnection = createAction(
    "[SenW Connection] Start connection"
);

export const connecting = createAction("[Quiz Connection] Connecting");
export const connectingSuccess = createAction(
    "[SenW Connection] Connection succesful"
);

export const reconnectingSuccess = createAction(
    "[SenW Connection] Reconnection succesful"
);

export const connectingFailed = createAction(
    "[SenW Connection] Connection failed"
);

export const disconnected = createAction("[SenW Connection] Disconnected");

// create Group

export const getGroups = createAction("[SenW] Get groups");
export const getGroupsSuccess = createAction(
    "[SenW] Get group success",
    props<{
        model: Array<GroupModel>;
      }>()
);

export const createGroup = createAction(
    "[SenW] Create group",
    props<{groupName: string, playerId: string}>()
);

export const createGroupSuccess = createAction(
    "[SenW] Create group success",
    props<{
        model: GroupCreatedModel;
      }>()
);

// create Player

export const createPlayer = createAction(
    "[SenW] Create player",
    props<{playerName: string, locationX: number, locationY: number}>()
);

export const createPlayerSuccess = createAction(
    "[SenW] Create player success",
    props<{
        model: PlayerCreatedModel;
      }>()
);

export const joinGroup = createAction(
    "[SenW] Join group",
    props<{groupId: string, playerId: string}>()
);

export const joinGroupSuccess = createAction(
    "[SenW] Join group success",
    props<{
        model: GroupJoinedModel;
      }>()
);

export const startUselessBox = createAction(
    "[SenW] Start uselessbox game",
    props<{gameName: string, groupId: string}>()
);

export const startUselessBoxSuccess = createAction(
    "[SenW] Start uselessbox game success",
    props<{
        model: GameCreatedModel;
      }>()
);

export const uselessBoxNextRound = createAction(
    "[SenW] UselessBox next round",
    props<{groupId: string, gameId: number}>()
);

export const uselessBoxNextRoundSuccess = createAction(
    "[SenW] UselessBox next round",
    props<{
        model: UselessBoxProgressModel;
      }>()
);

//todo: errors toevoegen