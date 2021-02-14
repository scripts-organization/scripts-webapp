import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarAlcaldeComponent } from './validar-alcalde.component';

describe('ValidarAlcaldeComponent', () => {
  let component: ValidarAlcaldeComponent;
  let fixture: ComponentFixture<ValidarAlcaldeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarAlcaldeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarAlcaldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
