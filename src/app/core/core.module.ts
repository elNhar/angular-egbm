import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';
import { ContentfulService } from './services/contentful-service/contentful.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SwiperModule } from 'swiper/angular';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { CardSectionComponent } from './components/card-section/card-section.component';
import { ContactComponent } from './components/contact/contact.component';
import { SharedModule } from '../shared/shared.module';
import { HeadingComponent } from './components/heading/heading.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LogoComponent,
        HeadingComponent,
        CardSectionComponent,
        ContactComponent,
    ],
    imports: [CommonModule, NgToastModule, SharedModule, RouterModule],
    exports: [
        HeaderComponent,
        FooterComponent,
        NgToastModule,
        SwiperModule,
        LogoComponent,
        CardSectionComponent,
        HeadingComponent,
        ContactComponent,
    ],
    providers: [ContentfulService],
})
export class CoreModule {}
