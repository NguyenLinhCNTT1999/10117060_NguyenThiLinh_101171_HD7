import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { env } from 'process';
import { BaseComponent } from 'src/app/services/base.component';
import { showDialog } from '../../../environments/environment'
declare var $: any;

@Component({
  selector: 'app-chuyen-nganh',
  templateUrl: './chuyen-nganh.component.html',
  styleUrls: ['./chuyen-nganh.component.css']
})


export class ChuyenNganhComponent extends BaseComponent implements OnInit {
  formdata: any;
  doneSetupForm = false;
  submitted = false;
  isCreate: any;
  single_item: any;
  showUpdateModal: any;
  api = 'api/chuyennganh';
  dsNganh: any;
  response: any;
  constructor(injector: Injector, private fb: FormBuilder) {
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
    this.loadChuyenNganh();
    console.log(this.response);

    this.loadNganh();
    this.buildForm();
  }
  get f() { return this.formdata.controls; }
  loadPage(page) {

  }
  loadChuyenNganh() {
    this._api.get(this.api + '/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.response = res;

    }, err => { });
  }
  loadNganh() {
    this._api.get('api/nganh' + '/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.dsNganh = res;

    }, err => { });
  }
 
  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.single_item = null;
    setTimeout(() => {
      $('#chuyenNganhModal').modal('toggle');
      this.formdata = this.fb.group({
        'machuyennganh': ['', Validators.required],
        'tenchuyennganh': ['', Validators.required],
        'nganh': ['', Validators.required,],
      });
      // this.formdata.get('ngaysinh').setValue(this.today);
      // this.formdata.get('gioitinh').setValue(this.genders[0].value); 
      // this.formdata.get('role').setValue(this.roles[0].value);
      this.doneSetupForm = true;
    });
  }
  buildForm() {
    this.formdata = this.fb.group({
      'machuyennganh': ['', Validators.required],
      'tenchuyennganh': ['', Validators.required],
      'nganh': ['', Validators.required,]
    });
  }
  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {
      let tmp = {
        maChuyenNganh: value.machuyennganh,
        tenChuyenNganh: value.tenchuyennganh,
        maNganh: value.nganh,
      };
      this._api.post(this.api + '/create', tmp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Thêm thành công');
        this.loadChuyenNganh();
        this.closeModal();
      });

    } else {
      let tmp = {
        maChuyenNganh: value.machuyennganh,
        tenChuyenNganh: value.tenchuyennganh,
        maNganh: value.nganh,
      };
      this._api.post(this.api + '/update', tmp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Cập nhật thành công');
        this.loadChuyenNganh();
        this.closeModal();
      });
    }
  }
  xoaChuyenNganh(ma) {
    showDialog('Xác nhận xóa', 'Bạn có muốn xóa?', 'confirm', 'confirmDelete(' + ma + ')');
  }

  confirmDelete(ma) {
    this._api.get(this.api + '/delete/' + ma)
      .takeUntil(this.unsubscribe).subscribe(res => {
        this.loadChuyenNganh();
      });
  }
  reset() {
    this.formdata = this.fb.group({
      'machuyennganh': ['', Validators.required],
      'tenchuyennganh': ['', Validators.required],
      'nganh': ['', Validators.required,]
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#chuyenNganhModal').modal('toggle');
      this._api.get(this.api + '/get-by-id/' + row.maChuyenNganh).takeUntil(this.unsubscribe).subscribe((res: any) => {
        this.single_item = res;
        // let ngaysinh = new Date(this.single_item.ngaysinh);
        this.formdata = this.fb.group({
          'machuyennganh': [this.single_item.maChuyenNganh, Validators.required],
          'tenchuyennganh': [this.single_item.tenChuyenNganh, Validators.required],
          'nganh': [this.single_item.maNganh, Validators.required],
        });
        this.doneSetupForm = true;
      });
    }, 700);
  }

  closeModal() {
    $('#chuyenNganhModal').closest('.modal').modal('hide');
  }
}