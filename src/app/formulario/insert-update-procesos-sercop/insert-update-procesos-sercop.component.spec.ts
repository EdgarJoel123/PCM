import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateProcesosSercopComponent } from './insert-update-procesos-sercop.component';

describe('InsertUpdateProcesosSercopComponent', () => {
  let component: InsertUpdateProcesosSercopComponent;
  let fixture: ComponentFixture<InsertUpdateProcesosSercopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdateProcesosSercopComponent]
    });
    fixture = TestBed.createComponent(InsertUpdateProcesosSercopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
