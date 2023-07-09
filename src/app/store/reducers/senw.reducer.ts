import { State } from "../state/senw.state";
import { createReducer, on } from "@ngrx/store";
import { connectingSuccess, createGroupSuccess, getGroupsSuccess, startConnection,
         createPlayerSuccess } from "../actions/senw.actions";

export const initialState: State = {
    groupName: "",
    groupId: "",
    playerName: "",
    playerId: "",
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
    player: [{
      playerId: "GUI-D-340934-DICK",
      playerName: "McPiemel"
    }]

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
      getGroupsSuccess,
      (state, props): State => ({
        ...state,
        groups: props.model
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
    on(
      createPlayerSuccess,
      (state, props): State => ({
        ...state,
        playerId: props.model.playerId,
        playerName: props.model.playerName
      })
    ),
  );