import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeferecintoComponent } from './jeferecinto.component';

describe('JeferecintoComponent', () => {
  let component: JeferecintoComponent;
  let fixture: ComponentFixture<JeferecintoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeferecintoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeferecintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
