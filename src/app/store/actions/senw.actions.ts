// connections

import { createAction, props } from "@ngrx/store";
import { GroupCreatedModel } from "../services/signal-r.models";

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

export const createGroup = createAction(
    "[SenW Connection] Create group",
    props<{groupName: string}>()
);

export const createGroupSuccess = createAction(
    "[SenW Connection] Create group success",
    props<{
        model: GroupCreatedModel;
      }>()
);