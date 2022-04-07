import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {getGames, loadGames, loadGamesFailed} from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Game} from '../../types/game';
import {Category} from '../../types/category';

@Injectable()
export class GamesEffects {
  loadGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getGames.type),
      switchMap(() =>
        this.http.get<Game[]>(`http://stage.whgstage.com/front-end-test/games.php`).pipe(
          map((data: Game[]) => this.mapSmallCategoriesIntoOther(data)),
          map((data: Game[]) => loadGames({ games: data })),
          catchError(() => of(loadGamesFailed()))
        )
      )
    )
  );

  private mapSmallCategoriesIntoOther(games: Game[]): Game[] {
    const conditions = ['ball', 'fun', 'virtual'] as Category[];

    return games.map((game) => {
      if (conditions.some((category: Category) => game.categories.includes(category.toLowerCase()))) {
        game.categories.push('other');
      }
      return game;
    });
  }

  constructor(private readonly actions$: Actions, private readonly http: HttpClient) {}
}
