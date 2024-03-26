import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [
         {
            name: 'Burger',
            description:'itsa burger',
            imagePath: 'https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg'
        },
        {
            name: 'Fries',
            description: 'some fries',
            imagePath: 'https://www.recipetineats.com/wp-content/uploads/2022/09/Fries-with-rosemary-salt_1.jpg'
        },
    ];
    @Output() recipeClicked = new EventEmitter<Recipe>();

    constructor() {}

    ngOnInit() {}

    onRecipeClicked(recipe: Recipe) {
        this.recipeClicked.emit(recipe);

    }
}
