import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsComponent } from './containers/forms/forms.component';
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: '', component: FormsComponent }
]

@NgModule({
  declarations: [FormsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class FormsModule { }
