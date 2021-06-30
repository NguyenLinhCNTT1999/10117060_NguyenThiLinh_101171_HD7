import { Injector } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';

@Component({
  selector: 'app-chuong-trinh-dao-tao',
  templateUrl: './chuong-trinh-dao-tao.component.html',
  styleUrls: ['./chuong-trinh-dao-tao.component.css']
})
export class ChuongTrinhDaoTaoComponent extends BaseComponent implements OnInit {

  dsNganh:any;
  dsHeDT:any;
  constructor(private injector:Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }
  loadNganh() {
    this._api.get('api/chuyenNganh' + '/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.dsNganh = res;

    }, err => { });
  }

  loadHeDT() {
    this._api.get('api/HeDaoTao' + '/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.dsHeDT = res;

    }, err => { });
  }
}
