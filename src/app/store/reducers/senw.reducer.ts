import { State } from "../state/senw.state";
import { createReducer, on } from "@ngrx/store";
import { connectingSuccess, createGroupSuccess, getGroupsSuccess, startConnection,
         createPlayerSuccess, 
         joinGroupSuccess} from "../actions/senw.actions";


export const initialState: State = {
  groupName: "",
  groupId: "",
  playerName: "",
  playerId: "",
  locationX: 0,
  locationY: 0,
  groups: [{
    groupId: "groupId12345",
    groupName: "supercoolenaam",
    gameLobby: null,
    playedGames: null,
    players: null,
    groupLeaderId: ""
  }],
  player: {
    playerId: "GUI-D-340934-DICK",
    playerName: "McPiemel",
    locationX: 0,
    locationY: 0,
    Avatar: "",
    Wins: 0,
    Loses: 0,
    Draws: 0
  },
  players: [],
  groupLeaderId: ""
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
            players: props.model.players,
            groupLeaderId: props.model.groupLeaderId,
          },
        ]),
        groupId: props.model.groupId,
        groupName: props.model.groupName,
        players: props.model.players,
        groupLeaderId: props.model.groupLeaderId,
      })
    ),
    on(
      createPlayerSuccess,
      (state, props): State => ({
        ...state,
        playerId: props.model.playerId,
        playerName: props.model.playerName,
        locationX: props.model.locationX,
        locationY: props.model.locationY,
      })
    ),
    on(
      joinGroupSuccess,
      (state, props): State => ({
        ...state,
        groupId: props.model.groupId,
        groupName: props.model.groupName,
        players: props.model.players,
        groupLeaderId: props.model.groupLeaderId,
      })
    ),
  );