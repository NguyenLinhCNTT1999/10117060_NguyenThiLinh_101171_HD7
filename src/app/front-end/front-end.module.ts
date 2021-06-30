import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChuongTrinhDaoTaoComponent } from './chuong-trinh-dao-tao/chuong-trinh-dao-tao.component';
import { HeaderComponent } from './layout/header/header.component';
import { FrontEndComponent } from './front-end.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: FrontEndComponent, children: [
      { path: 'chuong-trinh-dao-tao', component: ChuongTrinhDaoTaoComponent }
    ]
  }
]

@NgModule({
  declarations: [ChuongTrinhDaoTaoComponent, HeaderComponent, FrontEndComponent],
  imports: [
    CommonModule, LayoutsModule, RouterModule.forChild(routes)
  ]
})
export class FrontEndModule { }
