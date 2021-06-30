import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../services/base.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector,private router:Router) {
    super(injector)
  }

  ngOnInit(): void {
    if(!localStorage.getItem('user')){
      this.router.navigate(['login']);
    }
    
    setTimeout(() => {
      this.loadScripts();
    });
  }
  

}
