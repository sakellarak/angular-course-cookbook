import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  Ingredients: Ingredient[];
  private ingredientsUpdatedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.Ingredients = this.shoppingListService.getIngredients();
    this.ingredientsUpdatedSubscription = this.shoppingListService.ingredientUpdated
      .subscribe(
        () => {
          this.Ingredients = this.shoppingListService.getIngredients();
        }
      );
  }

  ngOnDestroy() {
    this.ingredientsUpdatedSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.editIngredient.next(index);
  }

}
