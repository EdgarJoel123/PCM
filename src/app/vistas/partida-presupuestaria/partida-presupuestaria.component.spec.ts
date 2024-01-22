import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidaPresupuestariaComponent } from './partida-presupuestaria.component';

describe('PartidaPresupuestariaComponent', () => {
  let component: PartidaPresupuestariaComponent;
  let fixture: ComponentFixture<PartidaPresupuestariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidaPresupuestariaComponent]
    });
    fixture = TestBed.createComponent(PartidaPresupuestariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
