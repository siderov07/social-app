import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { RegisterRoutingModule } from './register.module.routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [CommonModule, ReactiveFormsModule, RegisterRoutingModule],
})
export class RegisterModule {}
