import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { NewPlayerComponent } from './components/new-player/new-player.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LobbyComponent,
    data: { state: "senw" },
  },
  {
    path: "new",
    pathMatch: "full",
    component: NewPlayerComponent,
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
