import { createFeatureSelector, createSelector } from "@ngrx/store";
import { featureKey, State } from "../state/senw.state";

export const selectSenwState = createFeatureSelector<State>(featureKey);

export const selectGroups = createSelector(
    selectSenwState,
    (state: State) => {
        return state.groups;
      }
);

export const selectGroupId = createSelector(
  selectSenwState,
  (state: State) => {
      return state.groupId;
    }
);

export const selectPlayerId = createSelector(
  selectSenwState,
  (state: State) => {
      return state.playerId;
    }
);


export const selectGroupLeaderId = createSelector(
  selectSenwState,
  (state: State) => {
      return state.groupLeaderId;
    }
);

export const selectIsGroupLeader = createSelector(
  selectSenwState,
  (state: State) => {
    if(state.groupLeaderId == state.playerId){
      return true;
    }
    return false;
    }
);

//
export const selectPlayers = createSelector(
  selectSenwState,
  (state: State) => {
      return state.players;
    }
);

export const selectGroupName = createSelector(
  selectSenwState,
  (state: State) => {
      return state.groupName;
    }
);


//ff cheat for test enzo
export const selectGameLobby = createSelector(
  selectSenwState,
  (state: State) => {
      return state.gamelobby;
    }
);