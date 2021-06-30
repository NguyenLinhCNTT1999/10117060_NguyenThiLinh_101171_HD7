import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/services/base.component';
import { sumArray } from '../../../../environments/environment';
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {
  formCTDT: any; submitted: any;
  dsNganh: any;
  dsHeDT: any;
  formMonHoc: any;
  dsMonHoc: any;
  allMonHoc: any;
  len: any;
  index: any;
  tongMonHoc: number;
  tongSoTC: any;
  tongSoTCBatBuoc: any;
  doneSetupForm: any;
  keyWord: any;
  listSearchMonHoc: any;
  formSearch: any;
  allHocKy:any;
  constructor(private injector: Injector, private fb: FormBuilder, private router: Router) {
    super(injector);
  }

  ngOnInit(): void {
    this.allHocKy=[];
    for(let i=1;i<=8;i++){
      this.allHocKy.push(i);
    }
    this.tongSoTCBatBuoc = 0;
    this.formSearch = this.fb.group({
      'keyWord': ['']
    });
    this.buildCreateForm();
    this.loadMonHoc();
    this.showMonHoc();
    this.loadNganh();
    this.loadHeDT();
  }
  buildCreateForm() {
    this.formCTDT = this.fb.group({
      'maCTDT': ['', Validators.required],
      'tenCTDT': ['', Validators.required],
      'maChuyenNganh': ['', Validators.required],
      'maHe': ['', Validators.required],
      'namApDung': ['', Validators.required],
      'nguoiKy': ['', Validators.required]
    });
  }

  addMonHoc(item) {
    let local_storage: any;
    if (localStorage.getItem('dsMonHoc') == null) {
      local_storage = [item];
    } else {
      local_storage = JSON.parse(localStorage.getItem('dsMonHoc'));
      let ok = true;
      for (let x of local_storage) {
        if (x.maMon == item.maMon) {
          ok = false;
          break;
        }
      }
      if (ok) {
        item.hocKy = 1;
        item.monDieuKien = false;
        local_storage.push(item);
      }
    }
    localStorage.setItem('dsMonHoc', JSON.stringify(local_storage));
    this.showMonHoc();
  }

  showMonHoc() {
    if (localStorage.getItem('dsMonHoc') == null) {
      this.dsMonHoc = [];
    }
    else {
      this.dsMonHoc = JSON.parse(localStorage.getItem('dsMonHoc'));
    }
    let [all, lt, th] = [0, 0, 0];//tong/lt/th

    this.len = this.dsMonHoc.length;
    if (this.dsMonHoc.length == 0) return;
    for (let x of this.dsMonHoc) {
      all += x.soTCLyThuyet + x.soTCThucHanh;
      lt += x.soTCLyThuyet;
      th += x.soTCThucHanh;
    }
    this.tongSoTC = [all, lt, th];

  }

  createModal() {
    this.doneSetupForm = false;
    setTimeout(() => {
      $('#MonHocModal').modal('toggle');
      this.formMonHoc = this.fb.group({
        'mamon': ['', Validators.required],
        'tenmon': ['', Validators.required],
        'khoikienthuc': [''],
        'sotclt': [1, Validators.required],
        'sotcth': [1, Validators.required],
      });
      // this.formCTDT.get('ngaysinh').setValue(this.today);
      // this.formCTDT.get('gioitinh').setValue(this.genders[0].value); 
      // this.formCTDT.get('role').setValue(this.roles[0].value);
      this.doneSetupForm = true;
    });
  }
  get f() { return this.formMonHoc.controls; }
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
  createMonHoc(value) {
    this.submitted = true;
    if (this.formMonHoc.invalid) {
      return;
    } {

      let tmp = {
        maMon: value.mamon,
        tenMon: value.tenmon,
        khoiKienThuc: value.khoikienthuc,
        soTCLyThuyet: Number.parseFloat(value.sotclt),
        soTCThucHanh: Number.parseFloat(value.sotcth)

      };
      this._api.post('api/MonHoc' + '/create', tmp).takeUntil(this.unsubscribe).subscribe(res => {
        this.addMonHoc(tmp);
        this.closeModal();
        this.submitted = false;
      });

    }
  }

  createCTDT(value) {

    this.submitted = true;
    if (this.formCTDT.invalid) {
      return;
    }
    {
      let tmp = {
        maChuongTrinhDaoTao: value.maCTDT,
        tenChuongTrinhDaoTao: value.tenCTDT,
        maChuyenNganh: value.maChuyenNganh,
        maHe: value.maHe,
        tongSoTinChi: parseFloat(this.tongSoTC),
        namApDung: parseInt(value.namApDung),
        nguoiKy: value.nguoiKy,
        ctdtMonHoc: this.dsMonHoc
      };
      this._api.post('api/ChuongTrinhDaoTao' + '/create', tmp).takeUntil(this.unsubscribe).subscribe(res => {
        this._ctdt.removeAllItems();
        this.router.navigate(['main/chuong-trinh-dao-tao']);
        this.submitted = false;
      });

    }
  }

  reset() {
    this.formCTDT = this.fb.group({
      'mamon': ['', Validators.required],
      'tenmon': ['', Validators.required],
      'khoikienthuc': [''],
      'sotclt': [0, Validators.required],
      'sotcth': [0, Validators.required]
    });
    this.xoaTatCaMonHoc();
    this.showMonHoc();
  }

  xoaTatCaMonHoc() {
    localStorage.removeItem("dsMonHoc");
  }

  deleteMonHoc(maMon) {
    let local_storage = this.dsMonHoc.filter((x) => x.maMon != maMon);
    localStorage.setItem('dsMonHoc', JSON.stringify(local_storage));
    this.showMonHoc();
  }

  chonHocKy(hocKy, monHoc) {
    let local_storage = JSON.parse(localStorage.getItem('dsMonHoc'));

    monHoc.hocKy = parseInt(hocKy);

    localStorage.setItem('dsMonHoc', JSON.stringify(local_storage));

  }

  chonMonDieuKien(monHoc) {
    let local_storage = JSON.parse(localStorage.getItem('dsMonHoc'));

    monHoc.monDieuKien = !monHoc.monDieuKien;
    if (monHoc.monDieuKien) {
      this.tongSoTCBatBuoc += monHoc.soTCLyThuyet + monHoc.soTCThucHanh;
    }
    else {
      this.tongSoTCBatBuoc - (monHoc.soTCLyThuyet + monHoc.soTCThucHanh) < 0 ? 0 : this.tongSoTCBatBuoc - (monHoc.soTCLyThuyet + monHoc.soTCThucHanh);
    }


    localStorage.setItem('dsMonHoc', JSON.stringify(local_storage));

  }

  loadMonHoc() {
    this.index = 1;
    this.tongMonHoc = 0;
    this._api.get('api/monhoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.allMonHoc = res;
      let temp: any = res;
      this.tongMonHoc = temp.total;
    }, err => { });
  }

  searchMonHoc() {
    this.listSearchMonHoc = [];
    this.keyWord = this.formSearch.get('keyWord') && this.formSearch.get('keyWord').value.trim() != '' ? this.formSearch.get('keyWord').value.trim() : '%20';

    if (this.keyWord === '%20') {
      this.listSearchMonHoc = [];
    }
    else {
      this._api.get('api/monhoc/get-all/' + this.keyWord + '/' + '%20' + '/' + 1 + '/1000').takeUntil(this.unsubscribe).subscribe(res => {

        let temp: any = res;
        this.listSearchMonHoc = temp.data;
        this.tongMonHoc = temp.total;
      }, err => { });
    }

  }

  closeModal() {
    $('#MonHocModal').closest('.modal').modal('hide');
  }
  loadPage(page) {

    this._api.get('api/monhoc/get-all/' + '%20' + '/' + '%20' + '/' + page + '/6').takeUntil(this.unsubscribe).subscribe(res => {
      this.allMonHoc = res;
      let temp: any = res;
      this.tongMonHoc = temp.total;
    }, err => { });
  }
}
