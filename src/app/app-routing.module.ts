import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GamesContainerComponent} from './containers/games-container/games-container.component';

const routes: Routes = [
  {
    path: '',
    component: GamesContainerComponent,
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
