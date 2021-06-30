import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { FileUpload } from 'primeng/fileupload';
import { element } from 'protractor';
import {khoa} from '../../models/khoa';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-khoa',
  templateUrl: './khoa.component.html',
  styleUrls: ['./khoa.component.css']
})
export class KhoaComponent  extends BaseComponent implements OnInit {
  api = 'api/khoa';
  listKhoa: khoa[];
  khoa: khoa =new khoa;
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
   
   this.loadKhoa();
   
  }
  
  get()
  {
    return this.http.get('https://localhost:44382/api/khoa/get-all').toPromise().then((res)=>(this.khoa=res as khoa));
  }
  loadKhoa(){
    this._api.get('api/khoa/get-all').takeUntil(this.unsubscribe).subscribe(res => {
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
      $('#khoaModal').modal('toggle');
      this.formdata = this.fb.group({
        'makhoa': ['', Validators.required],
        'tenkhoa': ['', Validators.required],
        'sdt': [''],
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
          maKhoa: value.makhoa,
          tenKhoa: value.tenkhoa,
          soDienThoai: value.sdt,
        };
        this._api.post(this.api + '/create', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.loadKhoa();
          this.closeModal();
        }); 
    } else { 
        let tmp = { 
          maKhoa: value.makhoa,
          tenKhoa: value.tenkhoa,
          soDienThoai: value.sdt,
        };
        this._api.post(this.api + '/update', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.loadKhoa();
          this.closeModal();
        });
    }
  }

  xoaKhoa(ma) {
    if (confirm("bạn có muốn xóa?")) {
      this._api.get(this.api + '/delete/' + ma)
        .takeUntil(this.unsubscribe).subscribe(res => {
this.loadKhoa();
        });
    }
    
  }

  reset() {
    this.single_item = null;
    this.formdata = this.fb.group({
      'makhoa': ['', Validators.required],
      'tenkhoa': ['', Validators.required],
      'sdt': [''],
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#khoaModal').modal('toggle');
      this._api.get(this.api + '/get-by-id/' + row.makhoa).takeUntil(this.unsubscribe).subscribe((res: any) => {
        this.single_item = res;
        
        this.formdata = this.fb.group({
          'makhoa': [this.single_item.makhoa, Validators.required],
          'tenkhoa': [this.single_item.tenkhoa, Validators.required],
          'sdt': [this.single_item.soDienThoai],
        
        });
        this.doneSetupForm = true;
      });
    }, 700);
  }

  closeModal() {
    $('#khoaModal').closest('.modal').modal('hide');
  }

}



