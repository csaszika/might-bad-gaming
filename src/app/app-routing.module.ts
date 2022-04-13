import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamesContainerComponent} from './containers/games-container/games-container.component';
import { Routes as MyRoutes } from './types'
import {JackpotGamesContainerComponent} from './containers/jackpot-games-container/jackpot-games-container.component';

const routes: Routes = [
  {
    path: '',
    component: GamesContainerComponent,
  },
  {
    path: MyRoutes.JACKPOTS,
    component: JackpotGamesContainerComponent,
  },
  {
    path: ':category',
    component: GamesContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
