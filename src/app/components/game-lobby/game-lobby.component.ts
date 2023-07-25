import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { startConnection } from 'src/app/store/actions/senw.actions';
import { selectGroupName, selectPlayers } from 'src/app/store/selectors/senw.selectors';

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

  constructor(private store: Store) {
  }
    
  ngOnInit(): void {
    this.store.dispatch(startConnection());
  }
}
