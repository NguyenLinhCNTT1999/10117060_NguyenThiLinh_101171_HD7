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
  selector: 'app-diem',
  templateUrl: './diem.component.html',
  styleUrls: ['./diem.component.css']
})
export class DiemComponent  extends BaseComponent implements OnInit {
  fileName = 'FileExcel_diem.xlsx';
  api = 'api/diem';
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
   this.loadDiem();
  }
  loadDiem(){
    this._api.get('api/diem/get-all').takeUntil(this.unsubscribe).subscribe(res => {
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
      $('#diemModal').modal('toggle');
      this.formdata = this.fb.group({
        'madiem': ['', Validators.required],
        'masv': ['', Validators.required],
        'hoten': ['', Validators.required],
        'hocky': ['', Validators.required],
        'tenmon': ['', Validators.required],
        'diemlan1': ['', Validators.required],
        'diemlan2': ['', Validators.required],       
        'diemchuyencan': ['', Validators.required],     
        'diembaitap': ['', Validators.required],
        'diemquatrinh': ['', Validators.required],
        'diemtb': ['', Validators.required],
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
          maDiem: value.madiem,
          maSV: value.masv,
          hoTen: value.hoten,
          hocKy: value.hocky,
          tenMon: value.tenmon,
          diemLan1: value.diemlan1,
          diemLan2: value.diemlan2,       
          diemChuyenCan: value.diemchuyencan,   
          diemBaiTap: value.diembaitap,
          trangThai: value.trangthai,
          diemTB: value.diemtb,    
        };
        this._api.post(this.api + '/create', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.loadDiem();
          this.closeModal();
        }); 
    } else { 
        let tmp = { 
          maDiem: value.madiem,
          maSV: value.masv,
          hoTen: value.hoten,
          hocKy: value.hocky,
          tenMon: value.tenmon,
          diemLan1: value.diemlan1,
          diemLan2: value.diemlan2,       
          diemChuyenCan: value.diemchuyencan,   
          diemBaiTap: value.diembaitap,
          trangThai: value.trangthai,
          diemTB: value.diemtb,    
        };
        this._api.post(this.api + '/update', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.loadDiem();
          this.closeModal();
        });
    }
  }
  
  // xoaDiem(ma) {
  //   showDialog('Xác nhận xóa', 'Bạn có muốn xóa?', 'confirm', 'confirmDelete(' + ma + ')');
  // }

  confirmDelete(ma) {
    this._api.get(this.api + '/delete/' + ma)
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.loadDiem();
      });
  }

  reset() {
    this.single_item = null;
    this.formdata = this.fb.group({
        'madiem': ['', Validators.required],
        'masv': ['', Validators.required],
        'hoten': ['', Validators.required],
        'hocky': ['', Validators.required],
        'tenmon': ['', Validators.required],
        'diemlan1': ['', Validators.required],
        'diemlan2': ['', Validators.required],       
        'diemchuyencan': ['', Validators.required],     
        'diembaitap': ['',Validators.required],
        'diemquatrinh': ['', Validators.required],
        'diemtb': ['', Validators.required],
        'trangthai': ['', Validators.required],     
    });
  }
  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#diemModal').modal('toggle');
      this._api.get(this.api + '/get-by-id/' + row.maDiem).takeUntil(this.unsubscribe).subscribe((res: any) => {
        this.single_item = res;
        console.log(row.maDiem);
        // let ngaysinh = new Date(this.single_item.ngaysinh);
        this.formdata = this.fb.group({
          'madiem': [this.single_item.madiem, Validators.required],
          'masv': [this.single_item.maSV, Validators.required],
          'hoten': [this.single_item.hoten, Validators.required],
          'hocky': [this.single_item.hocky, Validators.required],
          'tenmon': [this.single_item.tenmon, Validators.required],
          'diemlan1': [this.single_item.diemlan1, Validators.required],
          'diemlan2': [this.single_item.diemlan2, Validators.required],
          'diemchuyencan': [this.single_item.diemchuyencan, Validators.required],
          'diembaitap': [this.single_item.diembaitap,Validators.required],
          'diemquatrinh': [this.single_item.diemquatrinh, Validators.required],
          'diemtb': [this.single_item.diemtb, Validators.required],
          'trangthai': [this.single_item.trangthai,Validators.required],
        
        });
        this.doneSetupForm = true;
      });
    }, 700);
  }

  closeModal() {
    $('#diemModal').closest('.modal').modal('hide');
  }

}

