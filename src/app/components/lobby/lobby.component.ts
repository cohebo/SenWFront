import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/models/group';
import { SenwService } from 'src/app/service/senw.service';
import { createGroup, startConnection } from 'src/app/store/actions/senw.actions';
import { CreateGroupModel } from 'src/app/store/services/signal-r.models';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit {
  groups: Array<Group> = [];
  constructor(private store: Store, private senwService: SenwService) {}

  ngOnInit(): void {
    const group: CreateGroupModel = {
      groupName: 'lalala',
    };
    this.store.dispatch(startConnection());
    this.store.dispatch(createGroup(group));
    this.getGroups();
  }

  getGroups() {
    this.senwService.GetGroups().subscribe(
      (groups: Array<Group>) => {
        // Process the groups data
        groups.forEach(g => {
        });
        this.groups = groups;
      },
      (error: any) => {
        // Handle error
        console.log(error);
      }
    );
  }
}
