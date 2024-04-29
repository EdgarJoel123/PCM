import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporExportExcelComponent } from './impor-export-excel.component';

describe('ImporExportExcelComponent', () => {
  let component: ImporExportExcelComponent;
  let fixture: ComponentFixture<ImporExportExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImporExportExcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImporExportExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
