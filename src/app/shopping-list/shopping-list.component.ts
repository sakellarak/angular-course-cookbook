import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit{
    ingredients: Ingredient[] = [
        {
            name: 'apples',
            amount: 5,
        },
        {
            name: 'tomatoes',
            amount: 2,
        }
    ];

    constructor() {}

    ngOnInit() {}

    onNewIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
    }

}
