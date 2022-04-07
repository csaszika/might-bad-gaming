export type GameId = string;

export interface Game {
  id: GameId;
  name: string;
  categories: string[],
  image: string;
}
