import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router:Router){

  }
  dialog:any;
  ngOnInit(): void {
     this.dialog=JSON.parse(localStorage.getItem("dialog"));

     if(!localStorage.getItem('user')){
      this.router.navigate(['login']);
    }
  }
 
  title = 'AdminEmarket';
  closeModal(){
    $('#DialogModal').closest('.modal').modal('hide');
  }
}
