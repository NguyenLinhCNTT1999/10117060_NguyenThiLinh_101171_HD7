import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/services/base.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends BaseComponent implements OnInit {
account:any;
profile:any;
  constructor(injector:Injector, private router:Router) {
    super(injector);
   }

  ngOnInit(): void {
    this.account=JSON.stringify(localStorage.getItem("user")).replace('"','');
    this.profile=localStorage.getItem("profile");
      this.loadScripts();
   
  }
  dangXuat(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);

  }

}
