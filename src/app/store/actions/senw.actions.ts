// connections

import { createAction } from "@ngrx/store";

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
