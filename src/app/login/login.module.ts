import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResigterComponent } from './resigter/resigter.component';
import {Routes,RouterModule} from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from '../layouts/layouts.module';
const routes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'resigter',component:ResigterComponent},
]

@NgModule({
  declarations: [ResigterComponent,LoginComponent],
  imports: [
    CommonModule,LayoutsModule,RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
