import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../core/services/contentful-service/contentful.service';
import { Entry } from 'contentful';
import { Meta, Title } from '@angular/platform-browser';
import { app } from 'src/app/app.constants';

@Component({
    selector: 'app-terapias-alternativas',
    template: `
        <app-heading [heading]="heading"></app-heading>
        <app-card-section [cards]="cards"></app-card-section>
    `,
})
export class TerapiasAlternativasComponent implements OnInit {
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
            .getPages(app.PAGES.TERAPIAS)
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
        // get cards
        this.contentfulService
            .getTerapiasDescription()
            .then((cards) => {
                this.cards = cards;
            })
            .catch((err) => {
                console.error(err);
            });

        // get heading
        this.contentfulService
            .getTerapiasHeading()
            .then((heading) => {
                this.heading = heading;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
