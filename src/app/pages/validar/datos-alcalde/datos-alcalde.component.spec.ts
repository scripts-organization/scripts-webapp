import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAlcaldeComponent } from './datos-alcalde.component';

describe('DatosAlcaldeComponent', () => {
  let component: DatosAlcaldeComponent;
  let fixture: ComponentFixture<DatosAlcaldeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosAlcaldeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAlcaldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
