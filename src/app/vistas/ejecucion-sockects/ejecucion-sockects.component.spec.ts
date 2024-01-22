import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecucionSockectsComponent } from './ejecucion-sockects.component';

describe('EjecucionSockectsComponent', () => {
  let component: EjecucionSockectsComponent;
  let fixture: ComponentFixture<EjecucionSockectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EjecucionSockectsComponent]
    });
    fixture = TestBed.createComponent(EjecucionSockectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
