import { State } from "../state/senw.state";
import { createReducer, on } from "@ngrx/store";
import { connectingSuccess, createGroupSuccess, getGroupsSuccess, startConnection,
         createPlayerSuccess, 
         joinGroupSuccess,
         startUselessBoxSuccess,
         uselessBoxNextRoundSuccess,
         getChatMessageSuccess} from "../actions/senw.actions";


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
  groupLeaderId: "",
  gamelobby: {
    name: "",
    players: [],
    game: undefined,
    active: false,
  },
  message: '',
  chatHistory: [],
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
    on(
      startUselessBoxSuccess,
      (state, props): State => ({
        ...state,
        gamelobby: props.model,
      })
    ),
    on(
      uselessBoxNextRoundSuccess,
      (state, props): State => ({
        ...state,
        gamelobby: {
          ...state.gamelobby,
          game: props.model ? {
            ...state.gamelobby.game!,
            gameId: props.model.gameId,
            state: props.model.state,
            count: props.model.count,
          } : undefined,
        },
      })
    ),
    on(
      getChatMessageSuccess,
      (state, props): State => ({
        ...state,
        message: props.model.message,
        chatHistory: [...state.chatHistory, {
              playerId: props.model.playerId,
              playerName: state.players.find((p) => p.playerId === props.model.playerId)?.playerName,
              chatMessage: props.model.message
            }]
          })
      ),
  );