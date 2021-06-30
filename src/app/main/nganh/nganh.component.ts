import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/services/base.component';
declare var $: any;
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-nganh',
  templateUrl: './nganh.component.html',
  styleUrls: ['./nganh.component.css']
})
export class NganhComponent extends BaseComponent implements OnInit {
  fileName= 'FileExcel_Ngành đào tạo.xlsx';
  formdata: any;
  dsKhoa: any;
  response: any;
  khoas: any = [];
  doneSetupForm = false;
  submitted = false;
  isCreate: any;
  public single_item: any;
  public totalRecords: any;
  public pageSize = 10;
  public page = 1;
  showUpdateModal: any;
  public formSearch: any;
  dialog: any;
  keyWord: any;
  kHoa: any;
  index: any;
  size: any;
  api = 'api/nganh';
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
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
    this.loadNganh();

    this.formSearch = this.fb.group({
      'keyWord': [''],
      'kHoa': ['']
    });
    this.getAllKhoa();
  }
 
  getAllKhoa() {
    this._api.get('api/khoa/get-all/').takeUntil(this.unsubscribe).subscribe(res => {
      this.khoas = res;
      this.dsKhoa = res;
    }, err => { });
  }
  timKiem() {
    this.keyWord = this.formSearch.get('keyWord') && this.formSearch.get('keyWord').value.trim() != '' ? this.formSearch.get('keyWord').value.trim() : '%20';
    this.kHoa = this.formSearch.get('kHoa') && this.formSearch.get('kHoa').value.trim() != '' ? (this.formSearch.get('kHoa').value) : '%20';
    console.log(this.kHoa);
   
    this._api.get('api/nganh/get-all/' + this.keyWord + '/' + this.kHoa + '/1/5').takeUntil(this.unsubscribe).subscribe(res => {
      this.response = res;
      this.totalRecords = this.response.total;
      this.index = this.response.pageIndex;
      this.size = this.response.pageSize;
    }, err => { });
  }
  
 

  get f() { return this.formdata.controls; }
  
  loadNganh() {
    this._api.get('api/nganh/get-all/').takeUntil(this.unsubscribe).subscribe(res => {
      
      this.response = res;
      this.totalRecords = this.response.total;
      this.index = this.response.pageIndex;
      this.size = this.response.pageSize;
    }, err => { });
  }

  loadPage(page) {
    this.keyWord = this.formSearch.get('keyWord') && this.formSearch.get('keyWord').value.trim() != '' ? this.formSearch.get('keyWord').value.trim() : '%20';
    this.kHoa = this.formSearch.get('kHoa') && this.formSearch.get('kHoa').value.trim() != '' ? (this.formSearch.get('kHoa').value) : '%20';
  
    this._api.get('api/nganh/get-all/' + this.keyWord + '/' + this.kHoa + '/' + page + '/5').takeUntil(this.unsubscribe).subscribe(res => {
      this.response = res;
      this.totalRecords = this.response.total;
      this.index = this.response.pageIndex;
      this.size = this.response.pageSize;
      this.response = Array.of(this.response); 
    }, err => { });
  }


  
  createModal() {
    this.loadNganh();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.single_item = null;
    setTimeout(() => {
      $('#NganhModal').modal('toggle');
      this.formdata = this.fb.group({
        'manganh': ['', Validators.required],
        'tennganh': ['', Validators.required],
        'makhoa': ['', Validators.required,Validators.minLength(2)],
      });
      this.doneSetupForm = true;
    });
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

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {

      let tmp = {
        maNganh: value.manganh,
        tenNganh: value.tennganh,
        maKhoa: value.makhoa,
      };
      console.log(tmp);
      
      this._api.post(this.api + '/create', tmp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Thêm thành công');
        this.loadNganh();
        this.closeModal();
      });

    } else {
      let tmp = {
        maNganh: value.manganh,
        tenNganh: value.tennganh,
        maKhoa: value.makhoa,
      };
      this._api.post(this.api + '/update', tmp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Cập nhật thành công');
        this.loadNganh();
        this.closeModal();
      });

    }
  }
  xoaNganh(ma) {
    if (confirm("bạn có muốn xóa?")) {
      this._api.get(this.api + '/delete/' + ma)
        .takeUntil(this.unsubscribe).subscribe(res => {
          this.loadNganh();
        });
    }
  }

  reset() {
    this.single_item = null;
    this.formdata = this.fb.group({
      'manganh': ['', Validators.required],
      'tennganh': ['', Validators.required],
      'makhoa': ['',Validators.required],
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#NganhModal').modal('toggle');
      this._api.get(this.api + '/get-by-id/' + row.maNganh).takeUntil(this.unsubscribe).subscribe((res: any) => {
        this.single_item = res;
        // let ngaysinh = new Date(this.single_item.ngaysinh);
        this.formdata = this.fb.group({
          'manganh': [this.single_item.maNganh, Validators.required],
          'tennganh': [this.single_item.tenNganh, Validators.required],
          'makhoa': [this.single_item.maKhoa],
        });
        this.doneSetupForm = true;
      });
    }, 700);
  }

  closeModal() {
    $('#NganhModal').closest('.modal').modal('hide');
  }

  checkSameValue(value, compareToValue) {
    return value === compareToValue;
  }
}
