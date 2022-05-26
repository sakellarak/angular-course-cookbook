import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  Ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private ingredientsUpdatedSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.Ingredients = this.store.select('shoppingList');

    // this.store.select('shoppingList').subscribe();
    //mporeis na kaneis kai ayto ama thes, einai kalo practice na kaneis unsub meta

    // to ekanes comment out giati evales NgRx
    // this.Ingredients = this.shoppingListService.getIngredients();
    // this.ingredientsUpdatedSubscription = this.shoppingListService.ingredientUpdated
    //   .subscribe(
    //     () => {
    //       this.Ingredients = this.shoppingListService.getIngredients();
    //     }
    //   );
  }

  ngOnDestroy() {
    // this.ingredientsUpdatedSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    // this.shoppingListService.editIngredient.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }


}
