import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionDetalleComponent } from './creacion-detalle.component';

describe('CreacionDetalleComponent', () => {
  let component: CreacionDetalleComponent;
  let fixture: ComponentFixture<CreacionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
