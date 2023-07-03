import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionFallidaComponent } from './confirmacion-fallida.component';

describe('ConfirmacionFallidaComponent', () => {
  let component: ConfirmacionFallidaComponent;
  let fixture: ComponentFixture<ConfirmacionFallidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionFallidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionFallidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
