import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleChartsModule } from 'angular-google-charts';
import * as CanvasJS from '../../assets/canvasjs-3.2.4/canvasjs.min.js';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,GoogleChartsModule,
    PanelModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,GoogleChartsModule,
    PanelModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule
  
  ],
})
export class LayoutsModule { }
