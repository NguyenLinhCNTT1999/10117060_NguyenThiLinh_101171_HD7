import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NganhComponent } from './nganh.component';

describe('NganhComponent', () => {
  let component: NganhComponent;
  let fixture: ComponentFixture<NganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
