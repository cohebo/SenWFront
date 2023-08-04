import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { Message } from 'src/app/models/message';
import { startConnection, startUselessBox, getChatMessage } from 'src/app/store/actions/senw.actions';
import { selectChatHistory, selectGroupId, selectGroupName, selectIsGroupLeader, selectPlayers } from 'src/app/store/selectors/senw.selectors';
import { CreateGameModel } from 'src/app/store/services/signal-r.models';
import { selectGroups, selectPlayerId, selectChatMessage } from 'src/app/store/selectors/senw.selectors';
import { GetChatMessageModel } from 'src/app/store/services/signal-r.models';

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

  playerId$: Observable<string> = this.store.select(selectPlayerId)
  playerId: string = "";

  chatMessage$: Observable<string> = this.store.select(selectChatMessage);
  chatMessage: string = "";

  chatHistory$: Observable<Array<Message>> = this.store.select(selectChatHistory);
  chatHistory!: Message[];

  newGroupForm: FormGroup;
  
  constructor(private store: Store, private formBuilder: FormBuilder, private router: Router) {
    this.newGroupForm = this.formBuilder.group({
      newChatMessage: ['', Validators.required]
    });
  }
    
  ngOnInit(): void {
    this.store.dispatch(startConnection());
    this.groupId$.subscribe((g) => { this.groupId = g});
    this.playerId$.subscribe((g) => { this.playerId = g});
    this.chatMessage$.subscribe((g) => { this.chatMessage = g});
    this.chatHistory$.subscribe((g) => { this.chatHistory = g});
  }

  StartUselessBox(): void{
    const createGame: CreateGameModel = {
      gameName: "UselessBox",
      groupId: this.groupId,
    };

    this.store.dispatch(startUselessBox(createGame));
    //this.router.navigate(['/uselessbox']);
  }

  
  SendMessage() {
    if (this.newGroupForm.valid) {
      const chatMessage: GetChatMessageModel = {
        groupId: this.groupId,
        playerId: this.playerId,
        message: this.newGroupForm.value.newChatMessage
      };
      console.log(chatMessage)
      this.store.dispatch(getChatMessage(chatMessage));
    };
  }
}
