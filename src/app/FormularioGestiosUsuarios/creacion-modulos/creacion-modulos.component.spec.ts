import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionModulosComponent } from './creacion-modulos.component';

describe('CreacionModulosComponent', () => {
  let component: CreacionModulosComponent;
  let fixture: ComponentFixture<CreacionModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionModulosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreacionModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
