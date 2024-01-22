import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdatePartidaPresupuestariaComponent } from './insert-update-partida-presupuestaria.component';

describe('InsertUpdatePartidaPresupuestariaComponent', () => {
  let component: InsertUpdatePartidaPresupuestariaComponent;
  let fixture: ComponentFixture<InsertUpdatePartidaPresupuestariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdatePartidaPresupuestariaComponent]
    });
    fixture = TestBed.createComponent(InsertUpdatePartidaPresupuestariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
