import { createFeatureSelector, createSelector } from "@ngrx/store";
import { featureKey, State } from "../state/senw.state";

export const selectSenwState = createFeatureSelector<State>(featureKey);

export const selectGroups = createSelector(
    selectSenwState,
    (state: State) => {
        return state.groups;
      }
);

export const selectPlayerId = createSelector(
  selectSenwState,
  (state: State) => {
      return state.playerId;
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
