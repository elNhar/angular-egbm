import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdcListComponent } from './rdc-list.component';

describe('RdcListComponent', () => {
    let component: RdcListComponent;
    let fixture: ComponentFixture<RdcListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RdcListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RdcListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
