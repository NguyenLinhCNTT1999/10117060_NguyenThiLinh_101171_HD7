import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChuongTrinhDaoTaoService {
  private itemsSubject = new BehaviorSubject<any[]>([]);
  items = this.itemsSubject.asObservable();
  constructor() {
    let local_storage = JSON.parse(localStorage.getItem('dsMonHoc'));
    if (!local_storage) {
      local_storage = [];
    }
    this.itemsSubject.next(local_storage); 
  }
  
  addtoList(item) {
    let local_storage:any;
    if (localStorage.getItem('dsMonHoc') == null) {
      local_storage = [item];
    } else {
      local_storage = JSON.parse(localStorage.getItem('dsMonHoc'));
      let ok = true;
      for (let x of local_storage) {
        if (x.maMon == item.maMon) {
          ok = false;
          break;
        }
      }
      if(ok){
        item.hocKy=1;
        item.monDieuKien=false;
        local_storage.push(item); 
      } 
    }
    localStorage.setItem('dsMonHoc', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  getItems() {
    if (localStorage.getItem('dsMonHoc') == null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('dsMonHoc'));
    }
  }

  deleteItem(item_id) {
    let local_storage = this.getItems().filter((x) => x.maMon != item_id);
    localStorage.setItem('dsMonHoc', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  addQty(item) {
    let local_storage = JSON.parse(localStorage.getItem('dsMonHoc'));
    for (let x of local_storage) {
      if (x.maSanPham == item.maSanPham) {
        x.quantity = item.quantity;
        break;
      }
    }
    localStorage.setItem('dsMonHoc', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  numberOfItems() {
    let local_storage = JSON.parse(localStorage.getItem('dsMonHoc'));
    return local_storage.length;
  }

  removeAllItems() {
   localStorage.removeItem("dsMonHoc");
   this.itemsSubject.next(null);
  }
  chonHocKy(hocKy, monHoc){
    let local_storage = JSON.parse(localStorage.getItem('dsMonHoc'));
    for (let x of local_storage) {
      if (x.maMon === monHoc.maMon) {
        x.hocKy = hocKy;
        break;
      }
    }
    localStorage.setItem('dsMonHoc', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }
  chonMonDieuKien(monHoc){
    let local_storage = JSON.parse(localStorage.getItem('dsMonHoc'));
    for (let x of local_storage) {
      if (x.maMon === monHoc.maMon) {
        x.monDieuKien = !x.monDieuKien;
        break;
      }
    }
    localStorage.setItem('dsMonHoc', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }
}