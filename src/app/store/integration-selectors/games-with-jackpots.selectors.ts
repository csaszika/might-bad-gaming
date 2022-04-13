import {createSelector} from '@ngrx/store';
import {Game, Jackpots} from '../../types';
import {selectGames} from '../games/selectors';
import {selectJackpots} from '../jackpots/selectors';

export const selectGamesWithJackpots = createSelector(
  selectGames,
  selectJackpots,
  (games: Game[], jackpots: Jackpots) => {
    return games.filter((game: Game) => !!jackpots[game.id]);
  }
);
