import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
    @Input() slides: Array<any> = [];
    swiperConfig: any = {
        slidesPerView: 1,
        spaceBetween: 35,
        loop: false,
        autoplay: {
            delay: 4000,
        },
    };
    scrollToElement() {
        const element = window.document.querySelector('#contacto')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
