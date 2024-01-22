import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectosTecnicosComponent } from './aspectos-tecnicos.component';

describe('AspectosTecnicosComponent', () => {
  let component: AspectosTecnicosComponent;
  let fixture: ComponentFixture<AspectosTecnicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AspectosTecnicosComponent]
    });
    fixture = TestBed.createComponent(AspectosTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
