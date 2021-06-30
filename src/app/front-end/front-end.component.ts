import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../services/base.component';

@Component({
  selector: 'app-front-end',
  templateUrl: './front-end.component.html',
  styleUrls: ['./front-end.component.css']
})
export class FrontEndComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
