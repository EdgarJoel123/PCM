import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateResponsableTecnicoComponent } from './insert-update-responsable-tecnico.component';

describe('InsertUpdateResponsableTecnicoComponent', () => {
  let component: InsertUpdateResponsableTecnicoComponent;
  let fixture: ComponentFixture<InsertUpdateResponsableTecnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdateResponsableTecnicoComponent]
    });
    fixture = TestBed.createComponent(InsertUpdateResponsableTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
