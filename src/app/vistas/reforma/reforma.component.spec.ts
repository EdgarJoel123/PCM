import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReformaComponent } from './reforma.component';

describe('ReformaComponent', () => {
  let component: ReformaComponent;
  let fixture: ComponentFixture<ReformaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReformaComponent]
    });
    fixture = TestBed.createComponent(ReformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
