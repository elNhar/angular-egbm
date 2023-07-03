import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraConfirmadaComponent } from './hora-confirmada.component';

describe('HoraConfirmadaComponent', () => {
  let component: HoraConfirmadaComponent;
  let fixture: ComponentFixture<HoraConfirmadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoraConfirmadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoraConfirmadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
