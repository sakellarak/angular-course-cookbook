import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(
      map( authState => {
        return authState.user;
      }))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });


  }

  onSave() {
    this.dataStorageService.storeRecipes();
    this.dataStorageService.storeShoppingList();
  }

  onFetch() {
      this.dataStorageService.fetchRecipes().subscribe();
      this.dataStorageService.fetchShoppingList().subscribe();

  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
