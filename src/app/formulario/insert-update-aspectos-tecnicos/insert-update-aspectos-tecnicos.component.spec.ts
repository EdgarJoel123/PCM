import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateAspectosTecnicosComponent } from './insert-update-aspectos-tecnicos.component';

describe('InsertUpdateAspectosTecnicosComponent', () => {
  let component: InsertUpdateAspectosTecnicosComponent;
  let fixture: ComponentFixture<InsertUpdateAspectosTecnicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUpdateAspectosTecnicosComponent]
    });
    fixture = TestBed.createComponent(InsertUpdateAspectosTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
