import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { startConnection } from 'src/app/store/actions/senw.actions';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log("ddd");
    this.store.dispatch(startConnection());
  }
}
