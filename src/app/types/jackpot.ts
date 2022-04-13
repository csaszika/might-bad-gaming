import {GameId} from './game';

export type GameJackpotAmount = number;

export interface Jackpots {
  [key: GameId]: GameJackpotAmount;
}

export interface Jackpot {
  game: GameId;
  amount: GameJackpotAmount;
}
