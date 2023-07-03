import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosSingleComponent } from './recursos-single.component';

describe('RecursosSingleComponent', () => {
    let component: RecursosSingleComponent;
    let fixture: ComponentFixture<RecursosSingleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecursosSingleComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RecursosSingleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
