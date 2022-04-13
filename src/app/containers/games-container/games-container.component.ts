import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {getGames, selectGameCategories} from '../../store/games/actions';
import {
  selectFilterCategory,
  selectGamesByCategory,
  selectGamesError,
  selectGamesLoading
} from '../../store/games/selectors';
import {startPollingJackpots} from '../../store/jackpots/actions';
import {delay, skip} from 'rxjs';
import {selectGamesWithJackpots} from '../../store/integration-selectors/games-with-jackpots.selectors';
import {selectJackpots} from '../../store/jackpots/selectors';
import {Routes} from '../../types/routes';

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

  gamesWithJackpots$ = this.store.pipe(select(selectGamesWithJackpots));
  jackpots$ = this.store.pipe(select(selectJackpots));

  isJackpotRoute = false;

  constructor(private readonly store: Store<any>,
              private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(getGames());
    this.store.dispatch(startPollingJackpots());

    this.activatedRoute.params.pipe(delay(1)).subscribe((param) => {
      this.isJackpotRoute = param['category'] === Routes.JACKPOTS;
      this.store.dispatch(selectGameCategories({ category: param['category']}));
    })
  }

}
