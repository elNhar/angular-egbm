import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SliderComponent } from './components/slider/slider.component';
import { CoreModule } from '../../core/core.module';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { BlogComponent } from './components/blog/blog.component';
import { SharedModule } from '../../shared/shared.module';
import { RecursosModule } from '../recursos/recursos.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HomeComponent,
        SliderComponent,
        TestimonialsComponent,
        BlogComponent,
    ],
    imports: [CommonModule, HomeRoutingModule, SharedModule, CoreModule, RouterModule],
})
export class HomeModule {}
