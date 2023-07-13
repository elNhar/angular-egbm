import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
    @Input() testimonials: Array<any> = [];
    swiperConfig: any = {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        autoHeight: true,
        autoplay: {
            delay: 8000,
        },
        pagination: { clickable: true },
        navigation: false
    };
}
