 
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/services/base.component';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { FileUpload } from 'primeng/fileupload';
import { element } from 'protractor';
import {hedaotao} from '../../models/hedaotao';
import { HttpClient } from '@angular/common/http';
declare var $: any;


@Component({
  selector: 'app-hedaotao',
  templateUrl: './hedaotao.component.html',
  styleUrls: ['./hedaotao.component.css']
})
export class HedaotaoComponent  extends BaseComponent implements OnInit {
  api = 'api/hedaotao';
  listHedaotao: hedaotao[];
  hedaotao: hedaotao =new hedaotao;
  response: any;
  loais: any; loai1s: any; loai2s: any;
  list_item: any;
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
  public formlsgia: any;
  public doneSetupForm: any;
  public showUpdateModal: any;
  public isCreate: any;
  submitted:any
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
    
   this.loadHedaotao();
  }
  get()
  {
    return this.http.get('https://localhost:44382/api/hedaotao/get-all').toPromise().then((res)=>(this.hedaotao=res as hedaotao));
  }
  
  loadHedaotao(){
    this._api.get('api/hedaotao/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.response = res;
    
    }, err => { });
  }
  

  // loadPage(page) {
  //   let keyWord = this.formSearch.get('tenSp') && this.formSearch.get('tenSp').value.trim() != '' ? this.formSearch.get('tenSp').value.trim() : '%20';
  //   let maloai1 = this.formSearch.get('loai1') && this.formSearch.get('loai1').value.trim() != '' ? this.formSearch.get('loai1').value.trim() : '%20';
  //   let maloai2 = this.formSearch.get('loai2') && this.formSearch.get('loai2').value.trim() ? this.formSearch.get('loai2').value.trim() : '%20';
  //   let lowToHighPrice = this.formSearch.get('lowToHighPrice').value ?? null;    //let newestFirst = this.formSearch.get('ten').value.toString() ?? null;
  //   let min = this.formSearch.get('giaMin') && this.formSearch.get('giaMin').value.trim() != '' ? parseInt(this.formSearch.get('giaMin').value) : 0;
  //   let max = this.formSearch.get('giaMax') && this.formSearch.get('giaMax').value.trim() != '' ? parseInt(this.formSearch.get('giaMax').value) : 0;
  //   let maloai = this.formSearch.get('loai') && this.formSearch.get('loai').value.trim() != '' ? parseInt(this.formSearch.get('loai').value) : 0;
  //   this._api.get(this.api + '/search/result/' + keyWord + '/' + '%20' + '/' + maloai + '/' + maloai1 + '/' + maloai2 + '/' + min + '/' + max + '/' + page + '/' + this.size + '/' + lowToHighPrice)
  //     .takeUntil(this.unsubscribe).subscribe(res => {
  //       this.response = res;
  //       this.list_item = this.response.data;
  //       this.totalRecords = this.response.totalItems;
  //     });
  // }


  pwdCheckValidator(control) {
    var filteredStrings = { search: control.value, select: '@#!$%&*' }
    var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
    if (control.value.length < 6 || !result) {
      return { matkhau: true };
    }
  }

  search() {
    let keyWord = this.formSearch.get('tenSp') && this.formSearch.get('tenSp').value.trim() != '' ? this.formSearch.get('tenSp').value.trim() : '%20';
    let maloai1 = this.formSearch.get('loai1') && this.formSearch.get('loai1').value.trim() != '' ? this.formSearch.get('loai1').value.trim() : '%20';
    let maloai2 = this.formSearch.get('loai2') && this.formSearch.get('loai2').value.trim() ? this.formSearch.get('loai2').value.trim() : '%20';
    let lowToHighPrice = this.formSearch.get('lowToHighPrice').value ?? null;
    //let newestFirst = this.formSearch.get('ten').value.toString() ?? null;
    let min = this.formSearch.get('giaMin') && this.formSearch.get('giaMin').value.trim() != '' ? parseInt(this.formSearch.get('giaMin').value) : 0;
    let max = this.formSearch.get('giaMax') && this.formSearch.get('giaMax').value.trim() != '' ? parseInt(this.formSearch.get('giaMax').value) : 0;
    let maloai = this.formSearch.get('loai') && this.formSearch.get('loai').value.trim() != '' ? parseInt(this.formSearch.get('loai').value) : 0;
    this._api.get(this.api + '/search/result/' + keyWord + '/' + '%20' + '/' + maloai + '/' + maloai1 + '/' + maloai2 + '/' + min + '/' + max + '/' + this.index + '/' + this.size + '/' + lowToHighPrice)
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.response = res;
        this.list_item = this.response.data;
        this.totalRecords = this.response.totalItems;
      });
  }

  resetSearchForm() {
    this.formSearch = this.fb.group({
      'tenSp': [''],
      'giaMin': [''],
      'giaMax': [''],
      'loai': [''],
      'loai1': [''],
      'loai2': [''],
      'lowToHighPrice': ['']
    });
  }

  get f() { return this.formdata.controls; }
  loadPage(page) {

  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.single_item = null;
    setTimeout(() => {
      $('#hedaotaoModal').modal('toggle');
      this.formdata = this.fb.group({
        'mahe': ['', Validators.required],
        'tenhe': ['', Validators.required],
 
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
          maHe: value.mahe,
          tenHe: value.tenHe,
        };
        this._api.post(this.api + '/create', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.loadHedaotao();
          this.closeModal();
        }); 
    } else { 
        let tmp = { 
          maHe: value.mahe,
          tenHe: value.tenhe,
        };
        this._api.post(this.api + '/update', tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.loadHedaotao();
          this.closeModal();
        });
    }
  }

  xoaHedaotao(ma) {
    if (confirm("bạn có muốn xóa?")) {
      this._api.get(this.api + '/delete/' + ma)
        .takeUntil(this.unsubscribe).subscribe(res => {
      this.loadHedaotao();
        });
    }
    
  }

  reset() {
    this.single_item = null;
    this.formdata = this.fb.group({
      'mahe': ['', Validators.required],
      'tenhe': ['', Validators.required],
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#hedaotaoModal').modal('toggle');
      this._api.get(this.api + '/get-by-id/' + row.mahe).takeUntil(this.unsubscribe).subscribe((res: any) => {
        this.single_item = res;
        // let ngaysinh = new Date(this.single_item.ngaysinh);
        this.formdata = this.fb.group({
          'mahe': [this.single_item.mahe, Validators.required],
          'tenhe': [this.single_item.tenhe, Validators.required],
        
        });
        this.doneSetupForm = true;
      });
    }, 700);
  }

  closeModal() {
    $('#hedaotaoModal').closest('.modal').modal('hide');
  }

}



