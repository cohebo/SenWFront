import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LobbyComponent,
    data: { state: "lobby" },
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