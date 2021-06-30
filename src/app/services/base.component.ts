
import { FileUpload } from 'primeng/fileupload';
import { Injector, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, of as observableOf, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { InventoryReceivingService } from './inventory-receiving.service';
import { inject } from '@angular/core/testing';
import { ChuongTrinhDaoTaoService } from './chuong-trinh-dao-tao.service';
export class BaseComponent {
   public unsubscribe = new Subject();
   public _renderer:any;
   public genders: any;
   public roles: any;
   public locale_vn:any;
   public today: any;
   public dateFormat: any;
   public _api: ApiService;
   public _iventoryreceiving:InventoryReceivingService;
   public _ctdt:ChuongTrinhDaoTaoService;
   public _route: ActivatedRoute;
   constructor(injector: Injector) {  
      this._renderer = injector.get(Renderer2);
      this._api = injector.get(ApiService);
      this._route = injector.get(ActivatedRoute);
      this._iventoryreceiving=injector.get(InventoryReceivingService);
      this._ctdt=injector.get(ChuongTrinhDaoTaoService);

      } 
   public loadScripts() {
         this.renderExternalScript('assets/vendor/jquery/jquery.min.js').onload = () => {
         }
	this.renderExternalScript('assets/vendor/bootstrap/js/bootstrap.min.js').onload = () => {
         }
	this.renderExternalScript('assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js').onload = () => {
         }
	this.renderExternalScript('assets/vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js').onload = () => {
         }
	this.renderExternalScript('assets/vendor/chartist/js/chartist.min.js').onload = () => {
         }
	this.renderExternalScript('assets/scripts/klorofil-common.js').onload = () => {
         }
       }
   public renderExternalScript(src: string): HTMLScriptElement {
         const script = document.createElement('script');
         script.type = 'text/javascript';
         script.src = src;
         script.async = true;
         script.defer = true;
         this._renderer.appendChild(document.body, script);
         return script;
       }
       public getEncodeFromImage(fileUpload: FileUpload) {
         if (fileUpload) {
           if (fileUpload.files == null || fileUpload.files.length == 0) {
             return observableOf('');
           }
           let file: File = fileUpload.files[0];
           let reader: FileReader = new FileReader();
           reader.readAsDataURL(file);
           return fromEvent(reader, 'load').pipe(
             map((e) => {
               let result = '';
               let tmp: any = reader.result;
               let baseCode = tmp.substring(tmp.indexOf('base64,', 0) + 7);
               result = file.name + ';' + file.size + ';' + baseCode;
               return result;
             })
           );
         } else {
           return observableOf(null);
         }}
}