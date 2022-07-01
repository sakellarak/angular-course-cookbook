import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRoutingModules } from "./shopping-list-routing.modules";
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    ShoppingListRoutingModules,
    SharedModule
  ]
})

export class ShoppingListModule {
}
