import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  selectFilterCategory,
  selectGamesByCategory,
  selectGamesError,
  selectGamesLoading
} from '../../store/games/selectors';
import {selectGamesWithJackpots} from '../../store/integration-selectors/games-with-jackpots.selectors';
import {selectJackpots} from '../../store/jackpots/selectors';
import {ActivatedRoute} from '@angular/router';
import {selectGameCategory} from '../../store/games/actions';

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

  constructor(private readonly store: Store<any>,
              private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(selectGameCategory({ category: this.activatedRoute.snapshot.params['category'] }))
  }

}
