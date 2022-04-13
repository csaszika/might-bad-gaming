import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotGamesContainerComponent } from './jackpot-games-container.component';

describe('JackpotGamesContainerComponent', () => {
  let component: JackpotGamesContainerComponent;
  let fixture: ComponentFixture<JackpotGamesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JackpotGamesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotGamesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
