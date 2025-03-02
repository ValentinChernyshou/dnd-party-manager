import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './auth/store/auth.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthHttpInterceptor } from './core/http.interceptor';
import Aura from '@primeng/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { usersReducer } from './users/store/users.reducer';
import { UsersEffects } from './users/store/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura } }),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([AuthHttpInterceptor])
    ),
    provideStore({ auth: authReducer, users: usersReducer }),
    provideEffects([AuthEffects, UsersEffects]),
    MessageService,
  ]
};
