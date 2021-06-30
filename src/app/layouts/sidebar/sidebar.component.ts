import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }
  menus: any;
  account:any;
  response:any;
  ngOnInit(): void {
    this.account=JSON.stringify(localStorage.getItem("user")).replace('','');
    this.menus = [
     {
        'name': 'Chương trình đào tạo', 'action': 'ctDT',
        'children':
          [
            { 'ten': 'Danh Sách', 'link': 'chuong-trinh-dao-tao' },
            { 'ten': 'Thêm chương trình', 'link': 'chuong-trinh-dao-tao/create' },
          ]
      }
    ]
    this.loadScripts();
    this.loadKhoa();
  }
 
   loadKhoa(){
     this._api.get('api/User/get-all').takeUntil(this.unsubscribe).subscribe(res => {
       this.response = res;
     }, err => { });
   }

}
