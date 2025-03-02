import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { AuthService } from '../core/auth.service';
import { CoreModule } from "../core/core.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule,
    CoreModule,
  ],
  providers: [AuthService]
})
export class AuthModule { }
