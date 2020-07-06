import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { ParentComponent } from './containers/parent/parent.component';
import { ChildComponent } from './components/child/child.component';

const routes: Routes = [
  { path: '', component: ParentComponent }
]

@NgModule({
  declarations: [ParentComponent, ChildComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class SetInputModule { }
