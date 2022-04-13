import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectGamesError, selectGamesLoading} from '../../store/games/selectors';
import {selectGamesWithJackpots} from '../../store/integration-selectors/games-with-jackpots.selectors';
import {selectJackpots} from '../../store/jackpots/selectors';
import {selectGameCategory} from '../../store/games/actions';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../types';

@Component({
  selector: 'app-jackpot-games-container',
  templateUrl: './jackpot-games-container.component.html',
  styleUrls: ['./jackpot-games-container.component.scss']
})
export class JackpotGamesContainerComponent implements OnInit {

  gamesWithJackpots$ = this.store.pipe(select(selectGamesWithJackpots));
  jackpots$ = this.store.pipe(select(selectJackpots));
  gamesLoading$ = this.store.pipe(select(selectGamesLoading));
  gamesError$ = this.store.pipe(select(selectGamesError));

  constructor(private readonly store: Store<any>,
              private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(selectGameCategory({ category: this.activatedRoute.snapshot.routeConfig!.path! as Category }))
  }
}
