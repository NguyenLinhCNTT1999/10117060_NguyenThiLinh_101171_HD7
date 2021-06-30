import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuyenNganhComponent } from './chuyen-nganh.component';

describe('ChuyenNganhComponent', () => {
  let component: ChuyenNganhComponent;
  let fixture: ComponentFixture<ChuyenNganhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuyenNganhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuyenNganhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
