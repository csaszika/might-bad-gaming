import {AppState} from '../index';
import {createSelector} from '@ngrx/store';
import {JackpotsState} from './reducer';

export const selectJackpotState = (state: AppState) => state.jackpots;

export const selectJackpots = createSelector(
  selectJackpotState,
  (state: JackpotsState) => state.jackpots
);

export const selectJackpotsLoading = createSelector(
  selectJackpotState,
  (state: JackpotsState) => state.loading
);
export const selectJackpotsError = createSelector(
  selectJackpotState,
  (state: JackpotsState) => state.error
);

