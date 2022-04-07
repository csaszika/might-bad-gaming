import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectGameCategories} from './store/games/actions';
import {selectFilterCategory} from './store/games/selectors';
import {Category} from './types/category';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  categories: Category[] = [
    "top", "new", "slots", "jackpots", "live", "blackjack",
    "roulette", "table", "poker", "other"
  ];

  selectedCategory$ = this.store.pipe(select(selectFilterCategory));

  constructor(private readonly store: Store<any>,
              private readonly router: Router) {
  }

  onCategoryClick(category: Category): void {
    this.store.dispatch(selectGameCategories({ category }));
    this.router.navigate([category]);
  }
}
