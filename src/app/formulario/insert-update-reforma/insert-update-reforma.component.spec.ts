import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateReformaComponent } from './insert-update-reforma.component';

describe('InsertUpdateReformaComponent', () => {
  let component: InsertUpdateReformaComponent;
  let fixture: ComponentFixture<InsertUpdateReformaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdateReformaComponent]
    });
    fixture = TestBed.createComponent(InsertUpdateReformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
