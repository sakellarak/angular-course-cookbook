import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "../recipes/recipe.model";

@Injectable({
  providedIn: "root"
})
export class ShoppingListService {
  // private ingredients: Ingredient[] = [
  //   new Ingredient('Apples',5),
  //   new Ingredient('Tomatoes',10),
  //   new Ingredient('Potatoes', 7),
  // ];
  private ingredients: Ingredient[] = [];
  ingredientUpdated = new Subject<void>();
  editIngredient = new Subject<number>();

  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  getIngredients(index?: number) {
    return this.ingredients.slice();
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientUpdated.next();
  }

  addNewIngredient(newIngredient: Ingredient | Ingredient[]) {
    //  Array.isArray(newIngredient) ? this.ingredients.push(...newIngredient) : this.ingredients.push(newIngredient)
    //  checkarw ama to input einai array of Ingredient h object Ingredient
    if (Array.isArray(newIngredient)) {
      for (let ingredient of newIngredient) {
        if (this.ingredients.findIndex(({name}) => name === ingredient.name) !== -1) {
          const ingredientIndex: number = this.ingredients.findIndex(({name}) => name === ingredient.name);
          this.ingredients[ingredientIndex].amount += ingredient.amount;
        } else {
          this.ingredients.push(ingredient);
        }
      }
    } else {
      if (this.ingredients.findIndex(({name}) => name === newIngredient.name) !== -1) {
        const ingredientIndex: number = this.ingredients.findIndex(({name}) => name === newIngredient.name);
        this.ingredients[ingredientIndex].amount += +newIngredient.amount;
      } else {
        this.ingredients.push(newIngredient);
      }
    }

    this.ingredientUpdated.next();
  }

  updateIngredient(index: number, editedIngredient: Ingredient) {
    this.ingredients[index] = editedIngredient;
    this.ingredientUpdated.next();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientUpdated.next();
  }

}
