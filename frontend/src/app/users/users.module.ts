import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routes';
import { CoreModule } from "../core/core.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UsersService } from "./users.service";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    ReactiveFormsModule,
    CoreModule,
  ],
  providers: [UsersService]
})
export class UsersModule { }
