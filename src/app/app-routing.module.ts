import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameLobbyComponent } from './components/game-lobby/game-lobby.component';
import { GameUselessBoxComponent } from './components/games/game-useless-box/game-useless-box.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { NewPlayerComponent } from './components/new-player/new-player.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: NewPlayerComponent,
    data: { state: "senw" },
  },
  {
    path: "lobby",
    pathMatch: "full",
    component: LobbyComponent,
    data: { state: "senw" },
  },
  {
    path: "gamelobby",
    pathMatch: "full",
    component: GameLobbyComponent,
    data: { state: "senw" },
  },
  {
    path: "uselessbox",
    pathMatch: "full",
    component: GameUselessBoxComponent,
    data: { state: "senw" },
  },
];
  @NgModule({
    imports: [
      RouterModule.forRoot(routes, {
        scrollPositionRestoration: "enabled",
        onSameUrlNavigation: "reload",
        enableTracing: false,
      }),
    ],
    exports: [RouterModule],
  })

export class AppRoutingModule { }