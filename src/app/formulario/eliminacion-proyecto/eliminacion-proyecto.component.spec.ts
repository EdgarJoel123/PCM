import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminacionProyectoComponent } from './eliminacion-proyecto.component';

describe('EliminacionProyectoComponent', () => {
  let component: EliminacionProyectoComponent;
  let fixture: ComponentFixture<EliminacionProyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminacionProyectoComponent]
    });
    fixture = TestBed.createComponent(EliminacionProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
