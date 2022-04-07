import {AppState} from '../index';
import {createSelector} from '@ngrx/store';
import {GamesState} from './reducer';
import {Game} from '../../types/game';
import {Category} from '../../types/category';

export const selectGameState = (state: AppState) => state.games;

export const selectGames = createSelector(
  selectGameState,
  (state: GamesState) => state.games
);

export const selectFilterCategory = createSelector(
  selectGameState,
  (state: GamesState) => state.filterCategory
);
export const selectGamesLoading = createSelector(
  selectGameState,
  (state: GamesState) => state.loading
);
export const selectGamesError = createSelector(
  selectGameState,
  (state: GamesState) => state.error
);

export const selectGamesByCategory = createSelector(
  selectGames,
  selectFilterCategory,
  (games: Game[], filterCategory: Category) => {
    return games.filter((game: Game) => game.categories.includes(filterCategory));
  }
);
