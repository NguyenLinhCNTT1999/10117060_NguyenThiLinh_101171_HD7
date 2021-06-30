import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../services/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm: any;
  response: any;
  constructor(private injector: Injector, private fb: FormBuilder, private router: Router) {
    super(injector);
  }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.router.navigate(['/main/mon-hoc'])
    }
    this.buildFormDangNhap()
  }
  buildFormDangNhap() {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required]
      ,
      'password': ['',  Validators.required]

    });
  }
  dangNhap(value) {
    let email = value.email;
    let password = value.password;
    this._api.post('api/user' + '/login/',{tenDangNhap:email,matKhau:password}).takeUntil(this.unsubscribe).subscribe(res => {
      this.response = res;
      if (this.response) {
        document.getElementById('error-login').style.display='none';

        localStorage.setItem('user', email);
        localStorage.setItem('profile',this.response);
        this.router.navigate(['/main/mon-hoc']);
      }
      else {
        document.getElementById('error-login').style.display='block';
        return;
      }
    }, err => { });
  }



  dangKy(value) {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/main/mon-hoc']);
    }
    else {
      let email = value.email;
      let password = value.password;
      this._api.get('api/user' + '/register').takeUntil(this.unsubscribe).subscribe(res => {
        this.response = res;
        if (this.response) {
          localStorage.setItem('user', email);
          this.router.navigate(['/main/mon-hoc']);
        }
        else {
          return;
        }
      }, err => { });
    }
  }

}
