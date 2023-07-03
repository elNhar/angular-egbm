import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { app } from 'src/app/app.constants';
import { ContentfulService } from '../../../../core/services/contentful-service/contentful.service';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

@Component({
    selector: 'app-recursos-list',
    templateUrl: './recursos-list.component.html',
    styleUrls: ['./recursos-list.component.scss'],
})
export class RecursosListComponent implements OnInit {
    heading: Array<any> = [];
    recursos: Array<any> = [];
    tags: Array<string> = [];
    p: number = 1;
    recursosLoaded: Array<any> = [];
    filterText: string = '';

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
            .getPages(app.PAGES.RECURSOS)
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
            .getRecursosHeading()
            .then((heading) => {
                this.heading = heading;
            })
            .catch((err) => {
                console.error(err);
            });

        // get recursos
        this.contentfulService
            .getRecursos()
            .then((recursos) => {
                recursos.forEach((post) => {
                    post.sys.createdAt = new Date(
                        post.sys.createdAt
                    ).toLocaleDateString();
                    post.fields.content = documentToPlainTextString(
                        post.fields.content
                    );
                    post.fields.tags.forEach((tag: string) => {
                        this.tags.push(tag);
                        this.tags = [...new Set(this.tags)];
                    });
                });

                this.recursos = recursos;
                this.recursosLoaded = recursos;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    getAll() {
        this.recursosLoaded = this.recursos;
    }

    getTag(str: string) {
        return (this.recursosLoaded = this.recursos.filter((item) =>
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
            this.recursosLoaded = this.recursos;
        } else {
            this.recursosLoaded = str
                ? this.recursos.filter((recurso) =>
                      recurso.fields.title
                          .toLowerCase()
                          .includes(str.toLowerCase())
                  )
                : this.recursosLoaded;
        }
    }
}
