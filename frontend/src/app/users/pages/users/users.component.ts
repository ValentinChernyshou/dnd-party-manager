import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/auth.service';
import * as UserActions from '../../store/users.actions';
import * as UserSelectors from '../../store/users.selectors';
import { Observable } from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FloatLabelModule,
    AsyncPipe
  ]
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  isAdmin = false;
  showDialog = false;
  selectedUser: User | null = null;

  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
  }

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
    this.isAdmin = this.authService.isAdmin();
  }

  openEditDialog(user: User) {
    this.selectedUser = { ...user };
    this.showDialog = true;
  }

  saveUser() {
    if (this.selectedUser) {
      this.store.dispatch(UserActions.updateUser({ user: this.selectedUser }));
      this.showDialog = false;
      this.selectedUser = null;
    }
  }

  deleteUser() {
    if (this.selectedUser) {
      this.store.dispatch(UserActions.deleteUser({ id: this.selectedUser.id }));
      this.showDialog = false;
      this.selectedUser = null;
    }
  }
}
