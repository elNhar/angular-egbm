import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { app } from 'src/app/app.constants';
import { ContentfulService } from '../../../../core/services/contentful-service/contentful.service';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

@Component({
    selector: 'app-rdc-list',
    templateUrl: './rdc-list.component.html',
    styleUrls: ['./rdc-list.component.scss'],
})
export class RdcListComponent implements OnInit {
    heading: Array<any> = [];
    redes: Array<any> = [];
    tags: Array<string> = [];
    p: number = 1;
    redesLoaded: Array<any> = [];
    filterText: string = '';
    description: Array<any> = [];

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
            .getPages(app.PAGES.REDES)
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

    fetchContent(): void {
        // get heading
        this.contentfulService
            .getRedesDeContactoHeading()
            .then((heading) => {
                this.heading = heading;
            })
            .catch((err) => {
                console.error(err);
            });

        // get description
        this.contentfulService
            .getRedesDeContactoList()
            .then((description) => {
                this.description = description;
            })
            .catch((err) => {
                console.error(err);
            });

        // get recursos
        this.contentfulService
            .getRedesDeContacto()
            .then((redes) => {
                redes.forEach((post) => {
                    post.fields.tags.forEach((tag: string) => {
                        this.tags.push(tag);
                        this.tags = [...new Set(this.tags)];
                    });
                });

                this.redes = redes;
                this.redesLoaded = redes;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    getAll() {
        this.redesLoaded = this.redes;
    }

    getTag(str: string) {
        return (this.redesLoaded = this.redes.filter((item) =>
            item.fields.tags.some((tag: any) => tag === str)
        ));
    }

    filterSearch(event: any): void {
        if (event !== null) {
            return this.applyFilter(event.target.value);
        }
    }

    applyFilter(str: string): void {
        if (str.length === 0) {
            this.redesLoaded = this.redes;
        } else {
            this.redesLoaded = str
                ? this.redes.filter((red) =>
                      red.fields.title.toLowerCase().includes(str.toLowerCase())
                  )
                : this.redesLoaded;
        }
    }
}
