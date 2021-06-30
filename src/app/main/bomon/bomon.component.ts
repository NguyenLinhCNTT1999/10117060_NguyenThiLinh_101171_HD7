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


@Component({
  selector: 'app-bomon',
  templateUrl: './bomon.component.html',
  styleUrls: ['./bomon.component.css']
})
export class BomonComponent  extends BaseComponent implements OnInit {
  api = 'api/bomon';
   
  response: any;
  index: any;
  trangthai:any;
  size: any;
  public single_item: any;
  public totalRecords: any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formSearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal: any;
  public isCreate: any;
  khoas:any;
  dsKhoa:any;
   submitted: any;

  constructor(private injector:Injector,private fb:FormBuilder, private http: HttpClient) {
    super(injector);
  }
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.response);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
  ngOnInit(): void {
   
   this.loadBomon();
   this.getAllKhoa();
  }
  
 
  loadBomon(){
    this._api.get('api/bomon/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.response = res;
    
    }, err => { });
  }

  getAllKhoa() {
    this._api.get('api/khoa/get-all/').takeUntil(this.unsubscribe).subscribe(res => {
   
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
      $('#bomonModal').modal('toggle');
      this.formdata = this.fb.group({
        'mabomon': ['', Validators.required],
        'tenbomon': ['', Validators.required],
        'makhoa': ['', Validators.required],
        'sdtnguoiquanly': ['', Validators.required],
        'nguoiquanly': ['', Validators.required],
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
          maBomon: value.mabomon,
          tenBomon: value.tenbomon,
          maKhoa: value.makhoa,
          sdtNguoiquanly: value.sdtnguoiquanly,
          nguoiQuanly: value.nguoiquanly,
        };
        this._api.post(this.api + '/create', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.loadBomon();
          this.closeModal();
        }); 
    } else { 
        let tmp = { 
          maBomon: value.mabomon,
          tenBomon: value.tenbomon,
          maKhoa: value.makhoa,
          sdtNguoiquanly: value.sdtnguoiquanly,
          nguoiQuanly: value.nguoiquanly,
        };
        this._api.post(this.api + '/update', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.loadBomon();
          this.closeModal();
        });
    }
  }

  xoaBomon(ma) {
    if (confirm("bạn có muốn xóa?")) {
      this._api.get(this.api + '/delete/' + ma)
        .takeUntil(this.unsubscribe).subscribe(res => {
this.loadBomon();
        });
    }
    
  }

  reset() {
    this.single_item = null;
    this.formdata = this.fb.group({
      'mabomon': ['', Validators.required],
        'tenbomon': ['', Validators.required],
        'makhoa': ['', Validators.required],
        'sdtnguoiquanly': ['', Validators.required],
        'nguoiquanly': ['', Validators.required],
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#bomonModal').modal('toggle');
      this._api.get(this.api + '/get-by-id/' + row.makhoa).takeUntil(this.unsubscribe).subscribe((res: any) => {
        this.single_item = res;
        
        this.formdata = this.fb.group({
          'mabomon': [this.single_item.mabomon, Validators.required],
        'tenbomon': [this.single_item.tenbomon, Validators.required],
        'makhoa': [this.single_item.makhoa, Validators.required],
        'sdtnguoiquanly': [this.single_item.sdtnguoiquanly, Validators.required],
        'nguoiquanly': [this.single_item.nguoiquanly, Validators.required],
 
        });
        this.doneSetupForm = true;
      });
    }, 700);
  }

  closeModal() {
    $('#bomonModal').closest('.modal').modal('hide');
  }

}



