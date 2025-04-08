import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './presentation/login-form/login-form.component';
import { RegisterFormComponent } from './presentation/register-form/register-form.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormsModule { }
