import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProfilComponent } from './other-profil.component';

describe('OtherProfilComponent', () => {
  let component: OtherProfilComponent;
  let fixture: ComponentFixture<OtherProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
