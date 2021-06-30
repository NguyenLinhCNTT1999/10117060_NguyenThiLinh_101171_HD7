import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachMonHocComponent } from './danh-sach-mon-hoc.component';

describe('DanhSachMonHocComponent', () => {
  let component: DanhSachMonHocComponent;
  let fixture: ComponentFixture<DanhSachMonHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachMonHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachMonHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
