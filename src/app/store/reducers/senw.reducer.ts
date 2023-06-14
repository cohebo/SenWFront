import { State } from "../state/senw.state";
import { createReducer, on } from "@ngrx/store";
import { connectingSuccess, createGroupSuccess, startConnection } from "../actions/senw.actions";

export const initialState: State = {
    groupName: "",
    groupId: "",
    groups: [{
      groupId: "groupId12345",
      groupName: "supercoolenaam",
      gameLobby: null,
      playedGames: null,
      players: null,
      groupLeader: null,
    },{
      groupId: "IDf38f-43f43fes-ss",
      groupName: "naampjeHoor",
      gameLobby: null,
      playedGames: null,
      players: null,
      groupLeader: null,
    }
  ],
  };
  export const reducer = createReducer(
    initialState,
    on(
      connectingSuccess,
      (state): State => ({
        ...state,
        groupName: "nieuw",
        groupId: "hellyeah!"
      })
    ),
    on(
      createGroupSuccess,
      (state, props): State => ({
        ...state,
        groups: state.groups.concat([
          {
            groupId: props.model.groupId,
            groupName: props.model.groupName,
            gameLobby: null,
            playedGames: null,
            players: null,
            groupLeader: null,
          },
        ]),
      })
    ),
  );