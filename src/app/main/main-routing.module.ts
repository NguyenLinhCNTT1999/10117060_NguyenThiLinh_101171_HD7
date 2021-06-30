import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { ChuyenNganhComponent } from './chuyen-nganh/chuyen-nganh.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KhoaComponent } from './khoa/khoa.component';
import { MainComponent } from './main.component';
import { MonHocComponent } from './mon-hoc/mon-hoc.component';
import { NganhComponent } from './nganh/nganh.component';
import { HedaotaoComponent } from './hedaotao/hedaotao.component';
import { BomonComponent } from './bomon/bomon.component';
import { SinhvienComponent } from './sinhvien/sinhvien.component';
import { DiemComponent } from './diem/diem.component';
import { LopComponent } from './lop/lop.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children:
      [
        { path: 'khoa', component: KhoaComponent },
        { path: 'mon-hoc', component: MonHocComponent },
         {path:'nganh',component: NganhComponent},
         {path:'sinh-vien',component:SinhvienComponent},
         {path:'diem',component:DiemComponent},
         {path:'lop',component:LopComponent},
        {path:'chuyen-nganh',component: ChuyenNganhComponent},
        { path: 'hedaotao', component: HedaotaoComponent },
        { path: 'bo-mon', component: BomonComponent },
        { path: 'chuong-trinh-dao-tao', loadChildren: () => import('./chuong-trinh-dao-tao/chuong-trinh-dao-tao.module').then(x => x.ChuongTrinhDaoTaoModule) }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
