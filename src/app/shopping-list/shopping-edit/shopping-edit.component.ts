import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slEditForm: NgForm;
  subscription: Subscription;
  editIngredient: Ingredient;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>,
  ) {}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editIngredient = stateData.editedIngredient;
        this.slEditForm.form.setValue({
          nameInput: this.editIngredient.name,
          amountInput: this.editIngredient.amount,
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onAddItem (form: NgForm) {
    const newIngredient: Ingredient = new Ingredient(form.value.nameInput,+form.value.amountInput)
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editIngredientIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      // this.shoppingListService.addNewIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.slEditForm.reset();
  }

  onDelete () {
    if (this.editMode) {
      // this.shoppingListService.deleteIngredient(this.editIngredientIndex);
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    }
    this.editMode = false;
    this.slEditForm.reset();
  }

  onClear () {
    this.editMode = false;
    this.slEditForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
