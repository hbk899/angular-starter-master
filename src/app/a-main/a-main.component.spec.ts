import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AMainComponent } from './a-main.component';

describe('AMainComponent', () => {
  let component: AMainComponent;
  let fixture: ComponentFixture<AMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
