import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, tap, withLatestFrom } from "rxjs";
import { connectingSuccess, createGroup, createGroupSuccess, getGroups, getGroupsSuccess, createPlayer, createPlayerSuccess, startConnection, joinGroupSuccess, joinGroup, startUselessBox, startUselessBoxSuccess, uselessBoxNextRound, uselessBoxNextRoundSuccess } from "../actions/senw.actions";
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
            playerId: model.playerId,
          })
          .pipe(
            map((groupCreatedModel) =>
              createGroupSuccess({
                model: {
                  groupId: groupCreatedModel.groupId,
                  groupName: groupCreatedModel.groupName,
                  players: groupCreatedModel.players,
                  groupLeaderId: groupCreatedModel.groupLeaderId,
                },
              })
            ),
            //catchError((error) => of(createGroepError({ e: error })))
          )
      )
    );
  });

  createPlayer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createPlayer),
      withLatestFrom(this.store.select(selectSenwState)),
      mergeMap(([model]) =>
        this.signalRService
          .createPlayer({
            playerName: model.playerName,
            locationX: model.locationX,
            locationY: model.locationY,
          })
          .pipe(
            map((playerCreatedModel) =>
              createPlayerSuccess({
                model: {
                  playerId: playerCreatedModel.playerId,
                  playerName: playerCreatedModel.playerName,
                  locationX: playerCreatedModel.locationX,
                  locationY: playerCreatedModel.locationY,
                },
              })
            ),
            //catchError((error) => of(createGroepError({ e: error })))
          )
      )
    );
  });
  joinGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(joinGroup),
      withLatestFrom(this.store.select(selectSenwState)),
      mergeMap(([model]) =>
        this.signalRService
          .joinGroup({
            groupId: model.groupId,
            playerId: model.playerId,
          })
          .pipe(
            map((joinGroupModel) =>
            joinGroupSuccess({
                model: {
                  groupId: joinGroupModel.groupId,
                  groupName: joinGroupModel.groupName,
                  players: joinGroupModel.players,
                  groupLeaderId: joinGroupModel.groupLeaderId,
                },
              })
            ),
            //catchError((error) => of(createGroepError({ e: error })))
          )
      )
    );
  });
  startUselessBox$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startUselessBox),
      withLatestFrom(this.store.select(selectSenwState)),
      mergeMap(([model]) =>
        this.signalRService
          .createGame({
            gameName: model.gameName,
            groupId: model.groupId,
          })
          .pipe(
            map((createGameModel) =>
              startUselessBoxSuccess({
                model: createGameModel
              }),
            ),
            tap(() => {
              this.router.navigate(['/uselessbox']);
            }),
            // catchError((error) => of(createGroepError({ e: error })))
          )
      )
    );
  });
  uselessBoxNextRound$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(uselessBoxNextRound),
      withLatestFrom(this.store.select(selectSenwState)),
      mergeMap(([model]) =>
        this.signalRService
          .uselessBoxProgress({
            groupId: model.groupId,
            gameId: model.gameId
          })
          .pipe(
            map((createGameModel) =>
              uselessBoxNextRoundSuccess({
                model: {
                  gameId: createGameModel.gameId,
                  state: createGameModel.state,
                  count: createGameModel.count,
                }
              }),
            ),
            // catchError((error) => of(createGroepError({ e: error })))
          )
      )
    );
  });
}