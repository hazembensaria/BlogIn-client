import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetOverviewExampleSheetComponent } from './bottom-sheet-overview-example-sheet.component';

describe('BottomSheetOverviewExampleSheetComponent', () => {
  let component: BottomSheetOverviewExampleSheetComponent;
  let fixture: ComponentFixture<BottomSheetOverviewExampleSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomSheetOverviewExampleSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetOverviewExampleSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
