import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {getJackpots, loadJackpots, loadJackpotsFailed} from './actions';
import {Jackpot} from '../../types';

@Injectable()
export class JackpotsEffects {
  loadJackpots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getJackpots),
      switchMap(() =>
        this.http.get<Jackpot[]>(`http://stage.whgstage.com/front-end-test/jackpots.php`).pipe(
          map((data: Jackpot[]) => loadJackpots({ jackpots: data })),
          catchError(() => of(loadJackpotsFailed()))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly http: HttpClient) {}
}
