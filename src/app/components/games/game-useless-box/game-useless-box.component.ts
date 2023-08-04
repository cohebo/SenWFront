import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameLobby } from 'src/app/models/gamelobby';
import { uselessBoxNextRound } from 'src/app/store/actions/senw.actions';
import { selectGameId, selectGameLobby, selectGroupId, selectIsGroupLeader, selectUselessBoxCount, selectUselessBoxState } from 'src/app/store/selectors/senw.selectors';
import { UselessBoxMakeProgressModel } from 'src/app/store/services/signal-r.models';

@Component({
  selector: 'app-game-useless-box',
  templateUrl: './game-useless-box.component.html',
  styleUrls: ['./game-useless-box.component.scss']
})
export class GameUselessBoxComponent implements OnInit {
  gameLobby$: Observable<GameLobby> = this.store.select(selectGameLobby);
  isGroupLeader$: Observable<boolean> = this.store.select(selectIsGroupLeader);
  groupId$: Observable<string> = this.store.select(selectGroupId);
  groupId: string = "";
  gameId$: Observable<number | undefined> = this.store.select(selectGameId);
  gameId: number = 0;
  state$: Observable<boolean | undefined> = this.store.select(selectUselessBoxState);
  count$: Observable<number | undefined> = this.store.select(selectUselessBoxCount);
  count: number = 0;

  constructor(private store: Store) {
  }
    
  ngOnInit(): void {
    this.gameId$.subscribe((g) => { this.gameId = g || 0 });
    this.groupId$.subscribe((g) => { this.groupId = g });
    this.count$.subscribe((g) => { this.count = g  || 0});
  }

  submit(): void {
    const progressRound: UselessBoxMakeProgressModel = {
      groupId: this.groupId,
      gameId: this.gameId,
    };
    this.store.dispatch(uselessBoxNextRound(progressRound))
  }
}
