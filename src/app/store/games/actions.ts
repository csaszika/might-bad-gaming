import { createAction, props } from '@ngrx/store';
import {Game, Category} from '../../types';

export const getGames = createAction('[Games] Fetch games');
export const loadGames = createAction('[Games] Load games into store', props<{ games: Game[] }>());
export const loadGamesFailed = createAction('[Games] Load games failed');

export const selectGameCategory = createAction('[Games] Select game category', props<{ category: Category }>());
