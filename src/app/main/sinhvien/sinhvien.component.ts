import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { FileUpload } from 'primeng/fileupload';
import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
declare var $: any;
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-sinh-vien',
  templateUrl: './sinhvien.component.html',
  styleUrls: ['./sinhvien.component.css']
})
export class SinhvienComponent  extends BaseComponent implements OnInit {
  fileName = 'FileExcel_Sinhvien.xlsx';
  api = 'api/sinhvien';
  response: any;
  loais: any; loai1s: any; loai2s: any;
  list_item: any;
  index: any;
  size: any;
  public single_item: any;
  public totalRecords: any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formSearch: any;
  public formdata: any;
  public formlsgia: any;
  public doneSetupForm: any;
  public showUpdateModal: any;
  public isCreate: any;
  submitted:any
  constructor(private injector:Injector,private fb:FormBuilder) {
    super(injector);
  }
  
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

  ngOnInit(): void {
   this.loadSinhVien();
  }
  loadSinhVien(){
    this._api.get('api/sinhvien/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.response = res;
    
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
      $('#sinhvienModal').modal('toggle');
      this.formdata = this.fb.group({
        'masv': ['', Validators.required],
        'hoten': ['', Validators.required],
        'ngaysinh': ['', Validators.required],
        'gioitinh': ['', Validators.required],
        'malop': ['', Validators.required],
        'dantoc': ['', Validators.required],
        'sodinhdanh': ['', Validators.required],
        'noicap': ['', Validators.required],       
        'ngaycap': ['', Validators.required],     
        'dienthoai': [''],
        'email': ['', Validators.required],
        'matkhau': ['', Validators.required],
        'trangthai': ['', Validators.required],     
      });
      this.doneSetupForm = true;
    });
  }
 
  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {
        let tmp = {
          maSV: value.masv,
          hoTen: value.hoten,
          ngaySinh: value.ngaysinh,
          gioiTinh: value.gioitinh,
          danToc: value.dantoc,
          maLop:value.malop,
          soDinhdanh: value.sodinhdanh,
          noiCap: value.noicap,       
          ngayCap: value.ngaycap,   
          dienThoai: value.dienthoai,
          email: value.email,
          matKhau: value.matkhau,
          trangThai: value.trangthai,    
        };
        this._api.post(this.api + '/create', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.loadSinhVien();
          this.closeModal();
        }); 
    } else { 
        let tmp = { 
          maSV: value.masv,
          hoTen: value.hoten,
          ngaySinh: value.ngaysinh,
          gioiTinh: value.gioitinh,
          maLop:value.malop,
          danToc: value.dantoc,
          soDinhdanh: value.sodinhdanh,
          noiCap: value.noicap,       
          ngayCap: value.ngaycap,   
          dienThoai: value.dienthoai,
          email: value.email,
          matKhau: value.matkhau,
          trangThai: value.trangthai,   
        };
        this._api.post(this.api + '/update', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.loadSinhVien();
          this.closeModal();
        });
    }
  }
  
  xoaSinhVien(ma) {
    if (confirm("bạn có muốn xóa?")) {
      this._api.get(this.api + '/delete/' + ma)
        .takeUntil(this.unsubscribe).subscribe(res => {
          this.loadSinhVien();
        });
    }
  }

  reset() {
    this.single_item = null;
    this.formdata = this.fb.group({
        'masv': ['', Validators.required],
        'hoten': ['', Validators.required],
        'ngaysinh': ['', Validators.required],
        'gioitinh': ['', Validators.required],
        'malop': ['', Validators.required],
        'dantoc': ['', Validators.required],
        'sodinhdanh': ['', Validators.required],
        'noicap': ['', Validators.required],       
        'ngaycap': ['', Validators.required],     
        'dienthoai': [''],
        'email': ['', Validators.required],
        'matkhau': ['', Validators.required],
        'trangthai': ['', Validators.required],     
    });
  }
  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#sinhvienModal').modal('toggle');
      this._api.get(this.api + '/get-by-id/' + row.maSV).takeUntil(this.unsubscribe).subscribe((res: any) => {
        this.single_item = res;
        console.log(row.maSV);
        // let ngaysinh = new Date(this.single_item.ngaysinh);
        this.formdata = this.fb.group({
          'masv': [this.single_item.maSV, Validators.required],
          'hoten': [this.single_item.hoten, Validators.required],
          'ngaysinh': [this.single_item.ngaysinh, Validators.required],
          'gioitinh': [this.single_item.gioitinh, Validators.required],
          'dantoc': [this.single_item.dantoc, Validators.required],
          'sodinhdanh': [this.single_item.sodinhdanh, Validators.required],
          'noicap': [this.single_item.noicap, Validators.required],
          'ngaycap': [this.single_item.ngaycap, Validators.required],
          'dienthoai': [this.single_item.dienthoai],
          'malop': [this.single_item.malop,Validators.required],
          'email': [this.single_item.email, Validators.required],
          'matkhau': [this.single_item.matkhau, Validators.required],
          'trangthai': [this.single_item.trangthai,Validators.required],
        
        });
        this.doneSetupForm = true;
      });
    }, 700);
  }

  closeModal() {
    $('#sinhvienModal').closest('.modal').modal('hide');
  }

}

