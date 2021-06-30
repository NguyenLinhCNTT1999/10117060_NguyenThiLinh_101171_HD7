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
  selector: 'app-lop',
  templateUrl: './lop.component.html',
  styleUrls: ['./lop.component.css']
})
export class LopComponent  extends BaseComponent implements OnInit {
  fileName = 'FileExcel_Lop.xlsx';
  api = 'api/lop';
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
   this.loadLop();
  }
  loadLop(){
    this._api.get('api/lop/get-all').takeUntil(this.unsubscribe).subscribe(res => {
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
      $('#lopModal').modal('toggle');
      this.formdata = this.fb.group({
        'malop': ['', Validators.required],
        'tenlop': ['', Validators.required],
        'makhoa': ['', Validators.required],
        'mahe': ['', Validators.required],
        'manganh': ['', Validators.required],
        'trinhdo': ['', Validators.required],
        'siso': ['', Validators.required],       
        'nienkhoa': ['', Validators.required],     
          
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
          maLop: value.malop,
          tenLop: value.tenlop,
          maKhoa: value.makhoa,
          maHe: value.mahe,
          maNganh: value.nganh,
          trinhDo: value.trinhdo,
          siSo: value.siso,       
          nienKhoa: value.nienKhoa,              
        };
        this._api.post(this.api + '/create', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.loadLop();
          this.closeModal();
        }); 
    } else { 
        let tmp = { 
          maLop: value.malop,
          tenLop: value.tenlop,
          maKhoa: value.makhoa,
          maHe: value.mahe,
          maNganh: value.nganh,
          trinhDo: value.trinhdo,
          siSo: value.siso,       
          nienKhoa: value.nienKhoa,       
        };
        this._api.post(this.api + '/update', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.loadLop();
          this.closeModal();
        });
    }
  }
  
  xoaLopn(ma) {
    if (confirm("bạn có muốn xóa?")) {
      this._api.get(this.api + '/delete/' + ma)
        .takeUntil(this.unsubscribe).subscribe(res => {
          this.loadLop();
        });
    }
  }

  reset() {
    this.single_item = null;
    this.formdata = this.fb.group({
      'malop': ['', Validators.required],
      'tenlop': ['', Validators.required],
      'makhoa': ['', Validators.required],
      'mahe': ['', Validators.required],
      'manganh': ['', Validators.required],
      'trinhdo': ['', Validators.required],
      'siso': ['', Validators.required],       
      'nienkhoa': ['', Validators.required],         
    });
  }
  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#lopModal').modal('toggle');
      this._api.get(this.api + '/get-by-id/' + row.maLop).takeUntil(this.unsubscribe).subscribe((res: any) => {
        this.single_item = res;
        console.log(row.maLop);
        // let ngaysinh = new Date(this.single_item.ngaysinh);
        this.formdata = this.fb.group({
          'malop': [this.single_item.maLop, Validators.required],
          'tenlop': [this.single_item.tenLop, Validators.required],
          'makhoa': [this.single_item.maKhoa, Validators.required],
          'mahe': [this.single_item.maHe, Validators.required],
          'trinhdo': [this.single_item.trinhDo, Validators.required],
          'siso': [this.single_item.siSo, Validators.required],
          'nienkhoa': [this.single_item.nienKhoa, Validators.required],
         
        
        });
        this.doneSetupForm = true;
      });
    }, 700);
  }

  closeModal() {
    $('#lopModal').closest('.modal').modal('hide');
  }

}

