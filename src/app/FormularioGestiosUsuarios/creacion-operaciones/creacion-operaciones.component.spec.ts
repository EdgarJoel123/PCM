import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionOperacionesComponent } from './creacion-operaciones.component';

describe('CreacionOperacionesComponent', () => {
  let component: CreacionOperacionesComponent;
  let fixture: ComponentFixture<CreacionOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionOperacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreacionOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
