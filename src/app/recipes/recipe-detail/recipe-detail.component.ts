import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {RecipeService} from "../recipe.service";
import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {}


  ngOnInit(): void {
    //this.recipe = this.recipeService.getRecipe(+this.route.snapshot.params['id']);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(+params['id']);
        }
      );
  }

  onAddToShoppingList() {
      // for (let ingredient of this.recipe.ingredients) {    <- polla event emits
      //   this.shoppingListService.addNewIngredient(ingredient);
      // }
    // this.shoppingListService.addNewIngredient(this.recipe.ingredients);

    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
