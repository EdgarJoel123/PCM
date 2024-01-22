import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminacionComponent } from './eliminacion.component';

describe('EliminacionComponent', () => {
  let component: EliminacionComponent;
  let fixture: ComponentFixture<EliminacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminacionComponent]
    });
    fixture = TestBed.createComponent(EliminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
