import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectosFinacierosComponent } from './aspectos-finacieros.component';

describe('AspectosFinacierosComponent', () => {
  let component: AspectosFinacierosComponent;
  let fixture: ComponentFixture<AspectosFinacierosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AspectosFinacierosComponent]
    });
    fixture = TestBed.createComponent(AspectosFinacierosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
