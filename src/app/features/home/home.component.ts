import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../core/services/contentful-service/contentful.service';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Meta, Title } from '@angular/platform-browser';
import { app } from 'src/app/app.constants';
import { Entry } from 'contentful';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
    selector: 'app-home',
    template: `
        <app-slider [slides]="slides"></app-slider>
        <app-card-section [cards]="cards"></app-card-section>
        <app-testimonials [testimonials]="testimonials"></app-testimonials>
        <app-blog [blog]="blog"></app-blog>
    `,
})
export class HomeComponent implements OnInit {
    slides: Array<any> = [];
    especialista: Array<any> = [];
    cards: Array<any> = [];
    testimonials: Array<any> = [];
    blog: Array<any> = [];

    constructor(
        private contentfulService: ContentfulService,
        private meta: Meta,
        private title: Title
    ) {}

    ngOnInit(): void {
        // set meta and get content
        this.setMeta();
        this.fetchContent();
    }

    private setMeta(): void {
        // get meta
        this.contentfulService
            .getPages(app.PAGES.INICIO)
            .then((page) => {
                // set meta
                this.meta.addTags([
                    {
                        name: 'description',
                        content: page[0].fields.description,
                    },
                ]);
                this.title.setTitle(
                    `${page[0].fields.title} - ${app.SITE_NAME}`
                );
            })
            .catch((err) => {
                console.error(err);
            });
    }

    private fetchContent(): void {
        // get sliders
        this.contentfulService
            .getHero()
            .then((slides) => {
                // display sliders
                this.slides = slides;
            })
            .catch((err) => {
                console.error(err);
            });

        // get cards
        this.getCards()
            .then((cards) => {
                this.cards = cards;
            })
            .catch((err) => {
                console.error(err);
            });

        // get testimonials
        this.contentfulService
            .getHomeTestimonials()
            .then((testimonials) => {
                // display content
                this.testimonials = testimonials;
            })
            .catch((err) => {
                console.error(err);
            });

        // get latest recursos
        this.contentfulService
            .getLatestRecursos()
            .then((recursos) => {
                recursos.forEach((blog) => {
                    blog.sys.createdAt = new Date(
                        blog.sys.createdAt
                    ).toLocaleDateString();
                    blog.fields.content = documentToPlainTextString(
                        blog.fields.content
                    );
                });
                // display content
                this.blog = recursos;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    private async getCards(): Promise<Entry<any>[]> {
        const especialista = await this.contentfulService.getEspecialista();
        const cards = await this.contentfulService.getHomeCards();
        cards.unshift(especialista[0]);
        return cards;
    }

    public renderHtml(html: any) {
        return documentToPlainTextString(html);
    }
}
