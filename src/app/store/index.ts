import { ActionReducerMap } from '@ngrx/store';

import {gamesReducer, GamesState} from './games/reducer';
import {jackpotsReducer, JackpotsState} from './jackpots/reducer';

export interface AppState {
  games: GamesState;
  jackpots: JackpotsState;
}

export const reducers: ActionReducerMap<AppState> = {
  games: gamesReducer,
  jackpots: jackpotsReducer,
};
