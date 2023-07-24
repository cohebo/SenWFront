import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createPlayer, startConnection } from 'src/app/store/actions/senw.actions';
import { selectPlayer } from 'src/app/store/selectors/senw.selectors';
import { CreatePlayerModel } from 'src/app/store/services/signal-r.models';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent implements OnInit {
  sliderValue: number = 0;

  textContent: string = ''
  latitude: number | undefined;
  longitude: number | undefined;

  onSliderChange(event: any) {
    this.sliderValue = Number(event.target.value);
  }

  player$: Observable<Array<Player>> = this.store.select(
    selectPlayer
  );
  newPlayerForm: FormGroup;
  
  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.newPlayerForm = this.formBuilder.group({
      newPlayerName: ['', Validators.required]
    });
  }
    
  ngOnInit(): void {
    this.store.dispatch(startConnection());
  }

  // TO DO: GetLocation naar service
  getLocation() {
 
    const success = (position: any) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log(this.latitude, this.longitude);
    };
  
    const error = () => {
      this.textContent = "Unable to retrieve your location";
      this.displayError(this.textContent);
    };
  
    if (!navigator.geolocation) {
      this.textContent = "Geolocation is not supported by your browser";
      this.displayError(this.textContent);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
  displayError(message: string) {
    console.log(message)
  }


  createNewPlayer() {
    if (this.newPlayerForm.valid) {

      this.getLocation();

      const player: CreatePlayerModel = {
        playerName: this.newPlayerForm.value.newPlayerName,
      };
      this.store.dispatch(createPlayer(player));
    }


  }
}