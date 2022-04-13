import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getGames, selectGameCategory} from './store/games/actions';
import {selectFilterCategory} from './store/games/selectors';
import {Category} from './types';
import {ActivatedRoute, Router} from '@angular/router';
import {startPollingJackpots} from './store/jackpots/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  categories: Category[] = [
    "top", "new", "slots", "jackpots", "live", "blackjack",
    "roulette", "table", "poker", "other"
  ];

  selectedCategory = '';

  constructor(private readonly store: Store<any>,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
  }

  // This part could be in a resolver or in a separated start up service
  ngOnInit() {
    this.store.dispatch(getGames());
    this.store.dispatch(startPollingJackpots());

    this.activatedRoute.params.pipe().subscribe((param) => {
      const newCategory = param['category'];
      if (newCategory !== '') {
        this.store.dispatch(selectGameCategory({ category: param['category']}))
      }
    });

    this.store.pipe(select(selectFilterCategory)).subscribe((category: Category) => {
      this.selectedCategory = category;
    })
  }

  onCategoryClick(category: Category): void {
    this.store.dispatch(selectGameCategory({ category }));
    this.router.navigate([category]);
  }
}
