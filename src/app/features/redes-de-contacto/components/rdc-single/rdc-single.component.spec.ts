import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdcSingleComponent } from './rdc-single.component';

describe('RdcSingleComponent', () => {
    let component: RdcSingleComponent;
    let fixture: ComponentFixture<RdcSingleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RdcSingleComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RdcSingleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
