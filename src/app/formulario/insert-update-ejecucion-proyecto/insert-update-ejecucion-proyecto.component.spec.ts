import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateEjecucionProyectoComponent } from './insert-update-ejecucion-proyecto.component';

describe('InsertUpdateEjecucionProyectoComponent', () => {
  let component: InsertUpdateEjecucionProyectoComponent;
  let fixture: ComponentFixture<InsertUpdateEjecucionProyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdateEjecucionProyectoComponent]
    });
    fixture = TestBed.createComponent(InsertUpdateEjecucionProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
