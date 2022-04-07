import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {ActivatedRoute, Router} from '@angular/router';
import {getGames, selectGameCategories} from '../../store/games/actions';
import {
  selectFilterCategory,
  selectGamesByCategory,
  selectGamesError,
  selectGamesLoading
} from '../../store/games/selectors';
import {getJackpots} from '../../store/jackpots/actions';
import {skip} from 'rxjs';
import {selectJackpots} from '../../store/jackpots/selectors';

@Component({
  selector: 'app-games-container',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesContainerComponent implements OnInit {

  gamesByCategory$ = this.store.pipe(select(selectGamesByCategory));
  gamesLoading$ = this.store.pipe(select(selectGamesLoading));
  gamesError$ = this.store.pipe(select(selectGamesError));
  selectedCategory$ = this.store.pipe(select(selectFilterCategory));
  jackpots$ = this.store.pipe(select(selectJackpots));

  constructor(private readonly store: Store<any>,
              private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(getGames());
    this.store.dispatch(getJackpots());

    this.activatedRoute.params.pipe(skip(1)).subscribe((param) => {
      this.store.dispatch(selectGameCategories({ category: param['category']}));
    })
  }

}
