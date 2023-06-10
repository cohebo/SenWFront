import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createGroup, startConnection } from 'src/app/store/actions/senw.actions';
import { CreateGroupModel } from 'src/app/store/services/signal-r.models';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})


export class LobbyComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    const group: CreateGroupModel = {
      groupName: 'lalala',
    };
    this.store.dispatch(startConnection());
    this.store.dispatch(createGroup(group));
  }
}
