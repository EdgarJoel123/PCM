import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateProformaComponent } from './insert-update-proforma.component';

describe('InsertUpdateProformaComponent', () => {
  let component: InsertUpdateProformaComponent;
  let fixture: ComponentFixture<InsertUpdateProformaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdateProformaComponent]
    });
    fixture = TestBed.createComponent(InsertUpdateProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
