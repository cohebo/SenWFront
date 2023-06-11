import { createFeatureSelector, createSelector } from "@ngrx/store";
import { featureKey, State } from "../state/senw.state";

export const selectSenwState = createFeatureSelector<State>(featureKey);

export const selectGroups = createSelector(
    selectSenwState,
    (state: State) => {
        return state.groups;
      }
);
