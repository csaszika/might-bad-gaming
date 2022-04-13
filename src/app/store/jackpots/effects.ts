import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, interval, map, mapTo, of, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {getJackpots, loadJackpots, loadJackpotsFailed, startPollingJackpots} from './actions';
import {Jackpot} from '../../types';

@Injectable()
export class JackpotsEffects {

  pollingJackpotsStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startPollingJackpots),
      switchMap(() => interval(3000).pipe(map(getJackpots)))
    )
  )

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
