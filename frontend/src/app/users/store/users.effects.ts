import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as UsersActions from './users.actions';
import { NotificationService } from '../../core/notification.service';
import { UsersService } from '../users.service';

@Injectable()
export class UsersEffects {
  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {}

  actions$ = inject(Actions);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map(users => UsersActions.loadUsersSuccess({ users })),
          tap(() => this.notificationService.success('Users loaded successfully', 'Users loaded successfully')),
          catchError(error => {
            this.notificationService.error('Failed to load users: ', error.message);
            return of(UsersActions.loadUsersFailure({ error }));
          })
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.createUser),
      mergeMap(action =>
        this.usersService.createUser(action.user).pipe(
          map(user => UsersActions.createUserSuccess({ user })),
          tap(() => this.notificationService.success('User created successfully', 'User created successfully')),
          catchError(error => {
            this.notificationService.error('Failed to create user: ', error.message);
            return of(UsersActions.createUserFailure({ error }));
          })
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      mergeMap(action =>
        this.usersService.updateUser(action.user).pipe(
          map(user => UsersActions.updateUserSuccess({ user })),
          tap(() => this.notificationService.success('User updated successfully', 'User updated successfully')),
          catchError(error => {
            this.notificationService.error('Failed to update user: ', error.message);
            return of(UsersActions.updateUserFailure({ error }));
          })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap(action =>
        this.usersService.deleteUser(action.id).pipe(
          map(() => UsersActions.deleteUserSuccess({ id: action.id })),
          tap(() => this.notificationService.success('User deleted successfully', 'User deleted successfully')),
          catchError(error => {
            this.notificationService.error('Failed to delete user: ', error.message);
            return of(UsersActions.deleteUserFailure({ error }));
          })
        )
      )
    )
  );
}
