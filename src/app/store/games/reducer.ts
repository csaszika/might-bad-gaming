import { createReducer, on } from '@ngrx/store';
import {getGames, loadGames, loadGamesFailed, selectGameCategory} from './actions';
import {Game} from '../../types';
import {Category} from '../../types/category';

export interface GamesState {
  games: Game[];
  filterCategory: Category;
  loading: boolean;
  error: boolean;
}

export const initialState: GamesState = {
  games: [],
  filterCategory: '',
  loading: false,
  error: false,
};

export const gamesReducer = createReducer(
  initialState,
  on(getGames, state => ({ ...state, loading: true, error: false })),
  on(loadGames, (state: GamesState, { games }) => ({
    ...state,
    loading: false,
    games: [...games],
  })),
  on(loadGamesFailed, state => ({ ...state, games: [], loading: false, error: true })),
  on(selectGameCategory, (state: GamesState, { category }) => ({
    ...state,
    filterCategory: category,
  })),
);
