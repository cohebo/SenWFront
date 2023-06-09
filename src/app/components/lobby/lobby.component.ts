import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { startConnection } from 'src/app/store/actions/senw.actions';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(startConnection());
  }
}
