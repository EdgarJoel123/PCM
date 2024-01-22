import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateAspectosFinancierosComponent } from './insert-update-aspectos-financieros.component';

describe('InsertUpdateAspectosFinancierosComponent', () => {
  let component: InsertUpdateAspectosFinancierosComponent;
  let fixture: ComponentFixture<InsertUpdateAspectosFinancierosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdateAspectosFinancierosComponent]
    });
    fixture = TestBed.createComponent(InsertUpdateAspectosFinancierosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
