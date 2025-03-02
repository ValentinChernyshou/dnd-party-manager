import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AsyncPipe } from "@angular/common";
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthLoading } from '../../store/auth.selectors';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    AsyncPipe
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@example.com', [Validators.required, Validators.email]],
      password: ['admin', Validators.required]
    });
    this.loading$ = this.store.select(selectAuthLoading);

    this.store.select(state => state).pipe(
      filter((action: any) => action.type === '[Auth] Set Login Mode')
    ).subscribe((response: any) => {
      if (!this.isLoginMode) {
        this.toggleMode();
      }
    });
  }

  signUp() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(AuthActions.register({ email, password }));
      this.store.select(selectAuthLoading).subscribe((loading: boolean) => {
        if (!loading) {
          this.toggleMode();
        }
      });
    }
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(AuthActions.login({ email, password }));
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    if (!this.isLoginMode) {
      this.loginForm.patchValue({
        email: 'user@example.com',
        password: 'user'
      });
    } else {
      this.loginForm.patchValue({
        email: 'admin@example.com',
        password: 'admin'
      });
    }
  }
}
