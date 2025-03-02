import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/auth.service';
import { NotificationService } from '../../core/notification.service';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {}

  actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(response => AuthActions.loginSuccess({
            token: response.token,
            role: response.role
          })),
          catchError(error => {
            this.notificationService.error('Login failed', error.error.message);
            return of(AuthActions.loginFailure({ error: error.message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((action) => {
        sessionStorage.setItem('token', action.token);
        sessionStorage.setItem('role', action.role);
        this.notificationService.success('Login successful', 'You have successfully logged in');
        this.router.navigate(['/users']);
      })
    ),
    { dispatch: false }
  );

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ email, password }) =>
        this.authService.register({ email, password, role: 'user', name: '', surname: '' }).pipe(
          map(response => {
            this.notificationService.success('Registration successful', 'Please login to continue');
            return AuthActions.registerSuccess({ message: response.message, status: response.status });
          }),
          catchError(error => {
            this.notificationService.error('Registration failed', error.error.message);
            return of(AuthActions.registerFailure({ error }));
          })
        )
      )
    );
  });

  registerSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(() => {
        this.store.dispatch(AuthActions.setLoginMode());
      })
    );
  }, { dispatch: false });
}
