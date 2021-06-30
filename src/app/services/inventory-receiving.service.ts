import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryReceivingService {

  private itemsSubject = new BehaviorSubject<any[]>([]);
  items = this.itemsSubject.asObservable();
  constructor() {
    let local_storage = JSON.parse(localStorage.getItem('invenrece'));
    if (!local_storage) {
      local_storage = [];
    }
    this.itemsSubject.next(local_storage); 
  }
  
  addtoList(item) {
    item.quantity = 1;
    let local_storage:any;
    if (localStorage.getItem('invenrece') == null) {
      local_storage = [item];
    } else {
      local_storage = JSON.parse(localStorage.getItem('invenrece'));
      let ok = true;
      for (let x of local_storage) {
        if (x.maSanPham == item.maSanPham) {
          x.quantity += 1;
          ok = false;
          break;
        }
      }
      if(ok){
        local_storage.push(item); 
      } 
    }
    localStorage.setItem('invenrece', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  getItems() {
    if (localStorage.getItem('invenrece') == null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('invenrece'));
    }
  }

  deleteItem(item_id) {
    let local_storage = this.getItems().filter((x) => x.maSanPham != item_id);
    localStorage.setItem('invenrece', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  addQty(item) {
    let local_storage = JSON.parse(localStorage.getItem('invenrece'));
    for (let x of local_storage) {
      if (x.maSanPham == item.maSanPham) {
        x.quantity = item.quantity;
        break;
      }
    }
    localStorage.setItem('invenrece', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  numberOfItems() {
    let local_storage = JSON.parse(localStorage.getItem('invenrece'));
    return local_storage.length;
  }

  removeAllItems() {
   localStorage.clear();
   this.itemsSubject.next(null);
  }
}
