import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: "root"
})
export class RecipeService {

  // private recipes: Recipe[] = [
  //   new Recipe('Beef',
  //     'a spicy beef',
  //     'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2021-11-Roast-Beef%2Fxtest_roast_beef-3',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Potatoes', 2)
  //     ]),
  //
  //   new Recipe('Beeeeeef',
  //     'a very spicy beef',
  //     'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2021-11-Roast-Beef%2Fxtest_roast_beef-3',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Potatoes', 6),
  //       new Ingredient('Spice', 2)
  //     ]),
  // ];
  private recipes: Recipe[] = [];
  recipesUpdated = new Subject<void>();

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesUpdated.next();
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesUpdated.next();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesUpdated.next();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesUpdated.next();
  }


}
