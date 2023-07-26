import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectGameLobby, selectIsGroupLeader } from 'src/app/store/selectors/senw.selectors';

@Component({
  selector: 'app-game-useless-box',
  templateUrl: './game-useless-box.component.html',
  styleUrls: ['./game-useless-box.component.scss']
})
export class GameUselessBoxComponent implements OnInit {
  gameLobby$: Observable<any> = this.store.select(selectGameLobby);
  isGroupLeader$: Observable<boolean> = this.store.select(selectIsGroupLeader);
  state: boolean = true;
  count: number = 0;

  constructor(private store: Store) {
  }
    
  ngOnInit(): void {
  }

  submit(): void {
    this.store.dispatch()
  }
}
