import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
    @Input() blog: Array<any> = [];
    swiperConfig: any = {
        slidesPerView: 1,
        spaceBetween: 15,
        padding: 15,
        loop: false,
        autoplay: {
            delay: 4000,
        },
        pagination: true,
        navigation: false,
        breakpoints: {
            992: {
                slidesPerView: 4,
                spaceBetween: 35,
                padding: 0,
            },
            420: {
                slidesPerView: 2,
                spaceBetween: 15,
                padding: 0,
                pagination: true,
            },
        },
    };
}
