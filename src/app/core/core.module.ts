import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';
import { ContentfulService } from './services/contentful-service/contentful.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SwiperModule } from 'swiper/angular';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HeadingComponent } from './components/heading/heading.component';
import { EmailService } from '../shared/services/email-service/email.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LogoComponent,
        HeadingComponent,
        ContactComponent,
        RecaptchaComponent
    ],
    imports: [CommonModule, NgToastModule, RouterModule, RecaptchaModule],
    exports: [
        HeaderComponent,
        FooterComponent,
        NgToastModule,
        SwiperModule,
        LogoComponent,
        HeadingComponent,
        ContactComponent,
        RecaptchaComponent
    ],
    providers: [ContentfulService, EmailService],
})
export class CoreModule {}
