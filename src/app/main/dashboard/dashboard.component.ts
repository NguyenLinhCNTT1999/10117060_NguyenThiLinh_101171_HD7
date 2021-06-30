import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {
donhangs:any;
index:any;
size:any;
data:any;
type:any;
options:any;

  constructor(injector:Injector) {
    super(injector) }
  ngOnInit(): void {
    
    this._api.get('api/QLSanPham/all-with-details/'+this.index+'/'+this.size).takeUntil(this.unsubscribe).subscribe(res => {
      this.donhangs = res;

      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
  
    this.data= [
      ['Điện tử điện lạnh', 8136000],
      ['Thời Trang -Phụ Kiện', 8538000],
      ['Điện thoại-Máy Tính Bảng', 2244000],
      ['Văn Phòng Phẩm', 3470000],
      ['Mẹ Và Bé', 19500000],
      
    ];
    this.type="AreaChart";
    this.options={
      is3D: true,
    }
  }

}
