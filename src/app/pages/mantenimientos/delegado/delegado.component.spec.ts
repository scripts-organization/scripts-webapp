import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegadoComponent } from './delegado.component';

describe('DelegadoComponent', () => {
  let component: DelegadoComponent;
  let fixture: ComponentFixture<DelegadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
