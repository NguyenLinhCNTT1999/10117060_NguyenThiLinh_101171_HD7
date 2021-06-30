import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HedaotaoComponent } from './hedaotao.component';

describe('HedaotaoComponent', () => {
  let component: HedaotaoComponent;
  let fixture: ComponentFixture<HedaotaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HedaotaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HedaotaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
