import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsComponent } from './containers/forms/forms.component';
import { FormsModule as fm, ReactiveFormsModule } from "@angular/forms";
import { CustomSelectComponent } from './shared/custom-select/custom-select.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

const routes: Routes = [
  { path: '', component: FormsComponent }
]

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [FormsComponent, CustomSelectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    fm,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'ru'
    })
  ]
})
export class FormsModule { }
