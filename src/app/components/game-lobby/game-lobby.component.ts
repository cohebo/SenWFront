import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { startConnection, startUselessBox } from 'src/app/store/actions/senw.actions';
import { selectGroupId, selectGroupName, selectIsGroupLeader, selectPlayers } from 'src/app/store/selectors/senw.selectors';
import { CreateGameModel } from 'src/app/store/services/signal-r.models';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit {
  groupName$: Observable<string> = this.store.select(
    selectGroupName
  );
  players$: Observable<Array<Player>> = this.store.select(
    selectPlayers
  );
  groupId$: Observable<string> = this.store.select(selectGroupId);
  groupId: string = "";
  
  isGroupLeader$: Observable<boolean> = this.store.select(selectIsGroupLeader);

  constructor(private store: Store, private router: Router) {
  }
    
  ngOnInit(): void {
    this.store.dispatch(startConnection());
    this.groupId$.subscribe((g) => { this.groupId = g});
  }

  StartUselessBox(): void{
    const createGame: CreateGameModel = {
      gameName: "UselessBox",
      groupId: this.groupId,
    };

    this.store.dispatch(startUselessBox(createGame));
    //this.router.navigate(['/uselessbox']);
  }
}
