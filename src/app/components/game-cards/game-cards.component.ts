import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Game, GameId, Jackpots} from '../../types';

@Component({
  selector: 'app-game-cards',
  templateUrl: './game-cards.component.html',
  styleUrls: ['./game-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardsComponent {

  @Input() games: Game[] = [];
  @Input() jackpots: Jackpots = {};

  gameTrackBy(index: number, game: Game): GameId {
    return game.id;
  }

}
