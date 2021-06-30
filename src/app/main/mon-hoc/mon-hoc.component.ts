import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { FileUpload } from 'primeng/fileupload';
import { element } from 'protractor';
declare var $: any;
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mon-hoc',
  templateUrl: './mon-hoc.component.html',
  styleUrls: ['./mon-hoc.component.css']
})
export class MonHocComponent extends BaseComponent implements OnInit {
  fileName = 'FileExcel_Monhoc.xlsx';
  response: any;
  loais: any;
  bomons: any = [];
  list_item: any;
  index: any;
  size: any;
  public single_item: any;
  public totalRecords: any;
  public pageSize = 10;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formSearch: any;
  public formdata: any;
  public formlsgia: any;
  public doneSetupForm: any;
  public showUpdateModal: any;
  public isCreate: any;
  submitted: any;
  dialog: any;
  keyWord: any;
  boMon: any;
  api = 'api/monhoc';
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }
  ngOnInit(): void {
    this.dialog = JSON.parse(localStorage.getItem("dialog"));
    this.loadMonHoc();
    this.formSearch = this.fb.group({
      'keyWord': [''],
      'boMon': ['']
    });
    this.getAllBoMon();
  }

  timKiem() {
    this.keyWord = this.formSearch.get('keyWord') && this.formSearch.get('keyWord').value.trim() != '' ? this.formSearch.get('keyWord').value.trim() : '%20';
    this.boMon = this.formSearch.get('boMon') && this.formSearch.get('boMon').value.trim() != '' ? (this.formSearch.get('boMon').value) : '%20';
    this._api.get('api/monhoc/get-all/' + this.keyWord + '/' + this.boMon + '/1/5').takeUntil(this.unsubscribe).subscribe(res => {
      this.response = res;
      this.totalRecords = this.response.total;
      this.index = this.response.pageIndex;
      this.size = this.response.pageSize;
    }, err => { });
  }

  showDialog = (title, message, dialogType, behavior) => {
    $('#DialogModal').modal('toggle');
    localStorage.setItem("dialog", JSON.stringify({
      title: title,
      message: message,
      dialogType: dialogType,
      behavior: behavior
    }));
  }

  loadMonHoc() {
    this._api.get('api/monhoc/get-all/%20/%20/1/5').takeUntil(this.unsubscribe).subscribe(res => {
      this.response = res;
      this.totalRecords = this.response.total;
      this.index = this.response.pageIndex;
      this.size = this.response.pageSize;
    }, err => { });
  }

  loadPage(page) {
    this.keyWord = this.formSearch.get('keyWord') && this.formSearch.get('keyWord').value.trim() != '' ? this.formSearch.get('keyWord').value.trim() : '%20';
    this.boMon = this.formSearch.get('boMon') && this.formSearch.get('boMon').value.trim() != '' ? (this.formSearch.get('boMon').value) : '%20';

    this._api.get('api/monhoc/get-all/' + this.keyWord + '/' + this.boMon + '/' + page + '/5').takeUntil(this.unsubscribe).subscribe(res => {
      this.response = res;
      this.totalRecords = this.response.total;
      this.index = this.response.pageIndex;
      this.size = this.response.pageSize;
    }, err => { });
  }


  pwdCheckValidator(control) {
    var filteredStrings = { search: control.value, select: '@#!$%&*' }
    var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
    if (control.value.length < 6 || !result) {
      return { matkhau: true };
    }
  }
 

  

  get f() { return this.formdata.controls; }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.single_item = null;
    setTimeout(() => {
      $('#MonHocModal').modal('toggle');
      this.formdata = this.fb.group({
        'mamon': ['', Validators.required],
        'tenmon': ['', Validators.required],
        'khoikienthuc': [''],
        'sotclt': [1, Validators.required],
        'sotcth': [1, Validators.required],
      });
 
      this.doneSetupForm = true;
    });
  }
  getAllBoMon() {
    this._api.get('api/bomon/get-all/').takeUntil(this.unsubscribe).subscribe(res => {
      this.bomons = res;

    }, err => { });
  }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {

      let tmp = {
        maMon: value.mamon,
        tenMon: value.tenmon,
        khoiKienThuc: value.khoikienthuc,
        ghiChu: value.ghichu,
        soTCLyThuyet: Number.parseFloat(value.sotclt),
        soTCThucHanh: Number.parseFloat(value.sotcth)
      };
      this._api.post(this.api + '/create', tmp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Thêm thành công');
        this.loadMonHoc();
        this.closeModal("MonHocModal");
      });

    } else {


      let tmp = {
        maMon: value.mamon,
        tenMon: value.tenmon,
        khoiKienThuc: value.khoikienthuc,
        ghiChu: value.ghichu,
        soTCLyThuyet: Number.parseFloat(value.sotclt),
        soTCThucHanh: Number.parseFloat(value.sotcth)
      };
      this._api.post(this.api + '/update', tmp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Cập nhật thành công');
        this.loadMonHoc();
        this.closeModal("MonHocModal");
      });

    }
  }

  getAllLoai() {
    this._api.get('api/Loai/all-with-children')
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.loais = res;
      });
  }
  confirmDelete(ma) {
    this._api.get(this.api + '/get-by-id/' + ma)
      .takeUntil(this.unsubscribe).subscribe((res: any) => {
        let title = "Xác nhận xóa";
        let message = "bạn có muốn xóa môn " + res.tenMon + "?";
        let dialogType = "confirm";
        let behavior = "xoaMonHoc('" + ma + "')";
        this.showDialog(title, message, dialogType, behavior);
      });
  }

  xoaMonHoc(mh) {
    if (confirm('bạn có chắc muốn xóa môn học ' + mh.tenMon + ' không?')){
      this._api.get(this.api + '/delete/' + mh.maMon)
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.loadMonHoc();
       
      });
    }
  }

  reset() {
    this.single_item = null;
    this.formdata = this.fb.group({
      'mamon': ['', Validators.required],
      'tenmon': ['', Validators.required],
      'khoikienthuc': [''],
      'sotclt': [0, Validators.required],
      'sotcth': [0, Validators.required]
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#MonHocModal').modal('toggle');
      this._api.get(this.api + '/get-by-id/' + row.maMon).takeUntil(this.unsubscribe).subscribe((res: any) => {
        this.single_item = res; console.log(res);

        // let ngaysinh = new Date(this.single_item.ngaysinh);
        this.formdata = this.fb.group({
          'mamon': [this.single_item.maMon, Validators.required],
          'tenmon': [this.single_item.tenMon, Validators.required],
          'khoikienthuc': [this.single_item.khoiKienThuc],
          'sotclt': [this.single_item.soTCLyThuyet],
          'sotcth': [this.single_item.soTCThucHanh, Validators.required],

        });
        this.doneSetupForm = true;
      });
    }, 700);
  }

  closeModal(modalName) {
    $("#" + modalName).closest('.modal').modal('hide');
  }

}



