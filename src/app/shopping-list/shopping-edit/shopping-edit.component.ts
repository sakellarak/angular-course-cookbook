import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slEditForm: NgForm;
  subscription: Subscription;
  editIngredient: Ingredient;
  editIngredientIndex: number;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.editIngredient
      .subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIngredientIndex = index;
        this.editIngredient = this.shoppingListService.getIngredient(index);
        this.slEditForm.form.setValue({
          nameInput: this.editIngredient.name,
          amountInput: this.editIngredient.amount,
        });
      }
    )
  }

  onAddItem (form: NgForm) {
    const newIngredient: Ingredient = new Ingredient(form.value.nameInput,+form.value.amountInput)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editIngredientIndex, newIngredient);
    } else {
      this.shoppingListService.addNewIngredient(newIngredient);
    }
    this.editMode = false;
    this.slEditForm.reset();
  }

  onDelete () {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editIngredientIndex);
    }
    this.editMode = false;
    this.slEditForm.reset();
  }

  onClear () {
    this.editMode = false;
    this.slEditForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
