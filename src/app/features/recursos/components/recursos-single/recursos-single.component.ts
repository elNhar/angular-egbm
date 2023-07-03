import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ContentfulService } from 'src/app/core/services/contentful-service/contentful.service';
import { app } from 'src/app/app.constants';

@Component({
    selector: 'app-recursos-single',
    templateUrl: './recursos-single.component.html',
    styleUrls: ['./recursos-single.component.scss'],
})
export class RecursosSingleComponent implements OnInit {
    private slug: string = '';
    singleRecurso: Entry<any>[] = [];

    constructor(
        private contentfulService: ContentfulService,
        private meta: Meta,
        private title: Title,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.slug = this.router.url.replace('/recursos/', '');

        this.contentfulService
            .getSingleRecurso(this.slug)
            .then((content) => {
                console.log(content);
                // meta
                this.meta.addTags([
                    {
                        name: 'description',
                        content: content[0].fields.title,
                    },
                ]);
                this.title.setTitle(
                    content[0].fields.title + ' - ' + app.SITE_NAME
                );
                // format date
                content.forEach((article) => {
                    article.sys.createdAt = new Date(
                        article.sys.createdAt
                    ).toLocaleDateString();
                });
                // get content
                this.singleRecurso = content;
            })
            .catch((err) => console.error(err));
    }
}
