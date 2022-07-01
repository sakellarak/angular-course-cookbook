import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Recipe } from "../recipe.model";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { RecipeService } from "../recipe.service";

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
              private router: Router,) {
  }

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
    this.shoppingListService.addNewIngredient(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
