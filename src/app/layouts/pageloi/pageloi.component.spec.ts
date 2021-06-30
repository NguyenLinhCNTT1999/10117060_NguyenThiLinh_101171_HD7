import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageloiComponent } from './pageloi.component';

describe('PageloiComponent', () => {
  let component: PageloiComponent;
  let fixture: ComponentFixture<PageloiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageloiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageloiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
