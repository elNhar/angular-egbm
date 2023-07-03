import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from "@angular/common";
import localeEs from '@angular/common/locales/es';
import { NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localeEs);
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomDatepickerI18n } from './custom-datepicker';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
    declarations: [AppointmentsComponent],
    imports: [
        CommonModule,
        AppointmentsRoutingModule,
        NgbDatepickerModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        NgbAccordionModule,
        RecaptchaModule
    ],
    providers: [{ provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // Register custom i18n provider
    NgbDatepickerConfig ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentsModule {}
