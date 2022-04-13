import { createReducer, on } from '@ngrx/store';
import {getJackpots, loadJackpots, loadJackpotsFailed} from './actions';
import { Jackpots } from '../../types';

export interface JackpotsState {
  jackpots: Jackpots;
  loading: boolean;
  error: boolean;
}

export const initialState: JackpotsState = {
  jackpots: {},
  loading: false,
  error: false,
};

export const jackpotsReducer = createReducer(
  initialState,
  on(getJackpots, state => ({ ...state, loading: true, error: false })),
  on(loadJackpots, (state: JackpotsState, { jackpots }) => ({
    ...state,
    loading: false,
    jackpots: Object.fromEntries(jackpots.map((e) => [e.game, e.amount])),
  })),
  on(loadJackpotsFailed, state => ({ ...state, jackpots: {}, loading: false, error: true })),
);
