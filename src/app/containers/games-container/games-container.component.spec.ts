import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {MockComponent, ngMocks} from 'ng-mocks';

import { AppState } from '../../store';
import {GamesContainerComponent} from './games-container.component';
import {GameCardsComponent} from '../../components/game-cards/game-cards.component';
import {getGames} from '../../store/games/actions';
import {getJackpots} from '../../store/jackpots/actions';
import {
  selectFilterCategory,
  selectGamesByCategory,
  selectGamesError,
  selectGamesLoading
} from '../../store/games/selectors';
import {Game} from '../../types';

describe('GamesContainerComponent', () => {
  let component: GamesContainerComponent;
  let fixture: ComponentFixture<GamesContainerComponent>;
  let store: MockStore<AppState>;
  let storeDispatchSpy: jasmine.Spy;

  const mockGames = [{ id: 'id', name: 'name', image: 'image', categories: []}] as Game[];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [GamesContainerComponent, MockComponent(GameCardsComponent)],
        providers: [provideMockStore({
          selectors: [{
            selector: selectGamesByCategory,
            value: mockGames
          },{
            selector: selectGamesLoading,
            value: false
          },{
            selector: selectGamesError,
            value: false
          },{
            selector: selectFilterCategory,
            value: false
          }]
        })],
      }).compileComponents();

      store = TestBed.inject<MockStore<AppState>>(MockStore);
      storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger to get competitions', () => {
    expect(storeDispatchSpy).toHaveBeenCalledWith(getGames());
    expect(storeDispatchSpy).toHaveBeenCalledWith(getJackpots());
  });

  const gameCards = () => ngMocks.find(GameCardsComponent).componentInstance;
  const loadingOrErrorSpan = () => fixture.nativeElement.querySelector('span');

  describe('Initialization', () => {
    describe('with games', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should have a game cards', () => {
        expect(gameCards().games).toEqual(mockGames);
      });
    });

    describe('with loading', () => {
      beforeEach(() => {
        store.overrideSelector(selectGamesLoading, true);
        store.refreshState();
      });

      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should have loading', () => {
        expect(loadingOrErrorSpan().innerHTML).toEqual('Loading...');
      });
    });

    describe('with error', () => {
      beforeEach(() => {
        store.overrideSelector(selectGamesError, true);
        store.refreshState();
      });

      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should have loading', () => {
        expect(loadingOrErrorSpan().innerHTML).toEqual('Error...');
      });
    });
  });
});
