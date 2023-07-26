import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group';
import { createGroup, getGroups, joinGroup, startConnection } from 'src/app/store/actions/senw.actions';
import { selectGroups, selectPlayerId } from 'src/app/store/selectors/senw.selectors';
import { CreateGroupModel, JoinGroupModel } from 'src/app/store/services/signal-r.models';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})

export class LobbyComponent implements OnInit {
  groups$: Observable<Array<Group>> = this.store.select(
    selectGroups
  );
  playerId$: Observable<string> = this.store.select(selectPlayerId)
  playerId: string = "";
  newGroupForm: FormGroup;
  
  constructor(private store: Store, private formBuilder: FormBuilder, private router: Router) {
    this.newGroupForm = this.formBuilder.group({
      newGroupName: ['', Validators.required]
    });
  }
    
  ngOnInit(): void {
    this.store.dispatch(startConnection());
    // Wait for 2 seconds before dispatching getGroups()
    // Move to effect, is better solution
    setTimeout(() => {
      this.store.dispatch(getGroups());
    }, 2000);

    this.playerId$.subscribe((playerId: string) => {
      this.playerId = playerId;
    });
  }

  createNewGroup() {
    if (this.newGroupForm.valid) {
      const group: CreateGroupModel = {
        groupName: this.newGroupForm.value.newGroupName,
        playerId: this.playerId,
      };
      this.store.dispatch(createGroup(group));
    }
    this.router.navigate(['/gamelobby']);
  }

  joinGroup(groupId: string) {
    const group: JoinGroupModel = {
      groupId: groupId,
      playerId: this.playerId,
    };
    this.store.dispatch(joinGroup(group));
    this.router.navigate(['/gamelobby']);
  }
}
