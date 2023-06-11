import { State } from "../state/senw.state";
import { createReducer, on } from "@ngrx/store";
import { startConnection } from "../actions/senw.actions";

export const initialState: State = {
    groupName: "",
    groupId: "",
  };
  export const reducer = createReducer(
    initialState,
    on(
      startConnection,
      (state): State => ({
        ...state,
        groupName: "nieuw",
        groupId: "hellyeah!"
    })
    )
  );