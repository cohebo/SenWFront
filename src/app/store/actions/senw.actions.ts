// connections

import { createAction, props } from "@ngrx/store";
import { GroupCreatedModel, GroupModel } from "../services/signal-r.models";

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

///

export const getGroups = createAction("[SenW] Get groups");
export const getGroupsSuccess = createAction(
    "[SenW] Get group success",
    props<{
        model: Array<GroupModel>;
      }>()
);

export const createGroup = createAction(
    "[SenW] Create group",
    props<{groupName: string}>()
);

export const createGroupSuccess = createAction(
    "[SenW] Create group success",
    props<{
        model: GroupCreatedModel;
      }>()
);