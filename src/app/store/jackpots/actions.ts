import { createAction, props } from '@ngrx/store';
import { Jackpot } from '../../types';

export const startPollingJackpots = createAction('[Jackpots] Start polling jackpots');
export const getJackpots = createAction('[Jackpots] Fetch jackpots');
export const loadJackpots = createAction('[Jackpots] Load jackpots into store', props<{ jackpots: Jackpot[] }>());
export const loadJackpotsFailed = createAction('[Jackpots] Load jackpots failed');

