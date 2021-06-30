import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageloiComponent } from './layouts/pageloi/pageloi.component';
// import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';
// import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import { LoginModule } from './login/login.module';
import { LayoutsModule } from './layouts/layouts.module';
import { FrontEndModule } from './front-end/front-end.module';
import { BomonComponent } from './bomon/bomon.component';



@NgModule({
  declarations: [
    AppComponent,
    PageloiComponent,

    UserComponent,

    BomonComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MainModule,HttpClientModule,FormsModule, NgbModule,LoginModule,LayoutsModule,FrontEndModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
