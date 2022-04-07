import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {MatToolbarModule} from '@angular/material/toolbar';
import {reducers} from './store';
import { GamesContainerComponent } from './containers/games-container/games-container.component';
import {GamesEffects} from './store/games/effects';
import {HttpClientModule} from '@angular/common/http';
import {JackpotsEffects} from './store/jackpots/effects';
import {MatButtonModule} from '@angular/material/button';
import { GameCardsComponent } from './components/game-cards/game-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesContainerComponent,
    GameCardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([GamesEffects, JackpotsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
