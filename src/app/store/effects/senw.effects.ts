import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, tap, withLatestFrom } from "rxjs";
import { connectingSuccess, createGroup, createGroupSuccess, getGroups, getGroupsSuccess, startConnection } from "../actions/senw.actions";
import { selectSenwState } from "../selectors/senw.selectors";
import { SignalRService } from "../services/signal-r.service";

@Injectable()
export class SenwEffects {
  constructor(
    private actions$: Actions,
    private signalRService: SignalRService,
    private router: Router,
    private store: Store
  ) {}

  startConnection$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(startConnection),
        tap(() => {
          this.signalRService.startConnection();
        })
      );
    },
    //This lets the effects handler know that this effect does not dispatch another action.
    //See https://ngrx.io/guide/effects/lifecycle#non-dispatching-effects for more information.
    { dispatch: false }
  );

  getGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGroups),
      withLatestFrom(this.store.select(selectSenwState)),
      mergeMap(() =>
        this.signalRService
          .getGroups()
          .pipe(
            map((groupsModel) =>
              getGroupsSuccess({
                model: groupsModel
              })
            ),
            //catchError((error) => of(createGroepError({ e: error })))
          )
      )
    );
  });

  createGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createGroup),
      withLatestFrom(this.store.select(selectSenwState)),
      mergeMap(([model]) =>
        this.signalRService
          .createGroup({
            groupName: model.groupName,
          })
          .pipe(
            map((groupCreatedModel) =>
              createGroupSuccess({
                model: {
                  groupId: groupCreatedModel.groupId,
                  groupName: groupCreatedModel.groupName,
                },
              })
            ),
            //catchError((error) => of(createGroepError({ e: error })))
          )
      )
    );
  });
}