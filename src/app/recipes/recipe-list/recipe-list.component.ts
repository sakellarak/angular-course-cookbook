import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Recipe } from 'src/app/recipes/recipe.model'
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipesUpdatedSubscription = new Subscription();

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesUpdatedSubscription = this.recipeService.recipesUpdated
      .subscribe(
        () => {
          this.recipes = this.recipeService.getRecipes();
        }
      );
  }

  ngOnDestroy() {
    this.recipesUpdatedSubscription.unsubscribe();
  }

}
