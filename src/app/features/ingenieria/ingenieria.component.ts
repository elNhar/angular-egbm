import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../core/services/contentful-service/contentful.service';
import { Meta, Title } from '@angular/platform-browser';
import { app } from 'src/app/app.constants';

@Component({
    selector: 'app-ingenieria',
    template: `
        <app-heading [heading]="heading"></app-heading>
        <app-card-section [cards]="cards"></app-card-section>
    `,
})
export class IngenieriaComponent implements OnInit {
    cards: Array<any> = [];
    heading: Array<any> = [];

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
            .getPages(app.PAGES.INGENIERIA)
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
        // get heading
        this.contentfulService
            .getIngenieriaHeading()
            .then((heading) => {
                this.heading = heading;
            })
            .catch((err) => {
                console.error(err);
            });

        // get cards
        this.contentfulService
            .getIngenieriaDescription()
            .then((cards) => {
                this.cards = cards;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
