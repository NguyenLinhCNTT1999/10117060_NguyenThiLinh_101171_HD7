import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResigterComponent } from './resigter.component';

describe('ResigterComponent', () => {
  let component: ResigterComponent;
  let fixture: ComponentFixture<ResigterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResigterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResigterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
