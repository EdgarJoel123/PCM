import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosSercopComponent } from './procesos-sercop.component';

describe('ProcesosSercopComponent', () => {
  let component: ProcesosSercopComponent;
  let fixture: ComponentFixture<ProcesosSercopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcesosSercopComponent]
    });
    fixture = TestBed.createComponent(ProcesosSercopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
