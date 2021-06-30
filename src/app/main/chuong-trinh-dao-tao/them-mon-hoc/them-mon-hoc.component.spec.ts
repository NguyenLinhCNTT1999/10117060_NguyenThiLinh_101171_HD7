import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemMonHocComponent } from './them-mon-hoc.component';

describe('ThemMonHocComponent', () => {
  let component: ThemMonHocComponent;
  let fixture: ComponentFixture<ThemMonHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemMonHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemMonHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
