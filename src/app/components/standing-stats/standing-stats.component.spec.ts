import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingStatsComponent } from './standing-stats.component';

describe('StandingStatsComponent', () => {
  let component: StandingStatsComponent;
  let fixture: ComponentFixture<StandingStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
