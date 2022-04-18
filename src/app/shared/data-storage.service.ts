import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";

import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {AuthService} from "../auth/auth.service";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Ingredient} from "./ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
      'https://ng-course-cookbook-aa722-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes)
      .subscribe(response => {
      // console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://ng-course-cookbook-aa722-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    )
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
          };
          // checkarw ama ta recipe poy fetchara exoyn ingredients, an nai ta krataw, an oxi vazw ena adeio array typou ingredient
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }

  storeShoppingList() {
    const ingredients = this.shoppingListService.getIngredients();
    this.http
      .put(
        'https://ng-course-cookbook-aa722-default-rtdb.europe-west1.firebasedatabase.app/shoppingList.json',
        ingredients)
      .subscribe(response => {
        // console.log(response);
      });
  }

  fetchShoppingList() {
    return this.http.get<Ingredient[]>(
      'https://ng-course-cookbook-aa722-default-rtdb.europe-west1.firebasedatabase.app/shoppingList.json'
    )
      .pipe(
        tap(shoppingList => {
          this.shoppingListService.setIngredients(shoppingList);
        })
      );
  }

}
