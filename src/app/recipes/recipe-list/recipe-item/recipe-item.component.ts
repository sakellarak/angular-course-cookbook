import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html'
})
export class RecipeItemComponent {
    @Input() recipeItem: Recipe;
    @Output() recipeClicked = new EventEmitter<Recipe>();

    onRecipeClicked() {
        this.recipeClicked.emit(this.recipeItem);

    }

}
