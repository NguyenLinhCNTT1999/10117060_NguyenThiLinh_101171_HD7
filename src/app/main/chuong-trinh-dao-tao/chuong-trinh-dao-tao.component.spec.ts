import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuongTrinhDaoTaoComponent } from './chuong-trinh-dao-tao.component';

describe('ChuongTrinhDaoTaoComponent', () => {
  let component: ChuongTrinhDaoTaoComponent;
  let fixture: ComponentFixture<ChuongTrinhDaoTaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuongTrinhDaoTaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuongTrinhDaoTaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
