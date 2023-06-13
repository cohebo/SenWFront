import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group';
import { SenwService } from 'src/app/service/senw.service';
import { createGroup, getGroups, startConnection } from 'src/app/store/actions/senw.actions';
import { selectGroups } from 'src/app/store/selectors/senw.selectors';
import { CreateGroupModel } from 'src/app/store/services/signal-r.models';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})

export class LobbyComponent implements OnInit {
  groups$: Observable<Array<Group>> = this.store.select(
    selectGroups
  );

  constructor(private store: Store, private senwService: SenwService) {}

  ngOnInit(): void {
    const group: CreateGroupModel = {
      groupName: 'lalala',
    };
    this.store.dispatch(startConnection());
    //vies even 2 seconden wachten op op connection te wachten. moet anders.
    setTimeout(() => {
      this.store.dispatch(getGroups());
    }, 2000);
    //vies even 5 seconden wachten op op connection te wachten. moet anders.
    setTimeout(() => {
      this.store.dispatch(createGroup(group));
    }, 5000);
  }
}
