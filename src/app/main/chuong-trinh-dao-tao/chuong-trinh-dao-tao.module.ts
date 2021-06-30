import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemMonHocComponent } from './them-mon-hoc/them-mon-hoc.component';
import { DanhSachMonHocComponent } from './danh-sach-mon-hoc/danh-sach-mon-hoc.component';
import { RouterModule, Routes } from '@angular/router';
import { ChuongTrinhDaoTaoComponent } from './chuong-trinh-dao-tao.component';
import { ChiTietComponent } from './chi-tiet/chi-tiet.component';
import { CreateComponent } from './create/create.component';import { LayoutsModule } from 'src/app/layouts/layouts.module';
;


const routes: Routes =
  [
    { path: '', component: ChuongTrinhDaoTaoComponent },
    { path: 'new-subject', component: ThemMonHocComponent },
    { path: 'create', component: CreateComponent }
  ]
@NgModule({
  declarations: [ChuongTrinhDaoTaoComponent, ThemMonHocComponent, DanhSachMonHocComponent, ChiTietComponent, CreateComponent],
  imports: [
    CommonModule,LayoutsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ChuongTrinhDaoTaoModule { }
