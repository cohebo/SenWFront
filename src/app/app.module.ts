import { HttpClientModule } from '@angular/common/http';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { SenwService } from './service/senw.service';
import { SenwEffects } from './store/effects/senw.effects';
import { reducer } from './store/reducers/senw.reducer';
import { SignalRService } from './store/services/signal-r.service';
import { GameFiltersComponent } from './components/lobby/game-filters/game-filters.component';
import { GroupListComponent } from './components/lobby/group-list/group-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    GameFiltersComponent,
    GroupListComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ senw: reducer }),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    EffectsModule.forRoot([SenwEffects])
  ],
  providers: [SenwService, SignalRService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {}
}