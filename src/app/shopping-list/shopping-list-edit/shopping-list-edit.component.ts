import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
})
export class ShoppingListEditComponent implements OnInit {
    newIngredient: FormGroup;
    @Output('newIngredient') ingredientEmitter = new EventEmitter<Ingredient>();

    ngOnInit() {
        this.newIngredient = new FormGroup({
            name: new FormControl<string>(null, Validators.required),
            amount: new FormControl<number>(null, [Validators.required, Validators.min(1)]),
        });
    }

    onAdd() {
        if (this.newIngredient.valid) {
            this.ingredientEmitter.emit({
                name: this.newIngredient.controls.name.value,
                amount: this.newIngredient.controls.amount.value,
            });
            this.newIngredient.reset();
        }
    }
}
