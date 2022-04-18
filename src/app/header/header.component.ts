import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
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
