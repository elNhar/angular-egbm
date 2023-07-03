import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { AxiosAngularAdapterService } from '@ngx-axios-adapter/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ContentfulService {
    private CONFIG = {
        space: environment.SPACE,
        accessToken: environment.TOKEN,
        contentTypeIds: {
            pages: 'pages',
            recursos: 'recursos',
            calendar: 'calendar',
            recursosHeading: 'recursosHeading',
            hero: 'hero',
            homeCards: 'homeCards',
            homeEspecialista: 'homeEspecialista',
            homeTestimonials: 'homeTestimonials',
            ingenieriaDescription: 'ingenieraDescription',
            ingenieriaHeading: 'ingenieraHeading',
            redesDeContacto: 'redesDeContacto',
            redesDeContactoList: 'redesDeContactoList',
            redesDeContactoHeading: 'redesDeContactoHeading',
            terapiasDescription: 'terapiasDescription',
            terapiasHeading: 'terapiasHeading',
            calendarioHeading: 'calendarioHeading'
        },
    };
    private client;

    constructor(private readonly axiosAdapter: AxiosAngularAdapterService) {
        this.client = createClient({
            space: this.CONFIG.space,
            accessToken: this.CONFIG.accessToken,
            //adapter: this.axiosAdapter.adapter
            adapter: (config: any) => {
                config.url = config.baseURL + '/' + config.url; // fix for Angular 9
                return this.axiosAdapter.adapter(config);
            },
        });
    }

    getPages(title: string, query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type: this.CONFIG.contentTypeIds.pages,
                        'fields.title': title,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getHero(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type: this.CONFIG.contentTypeIds.hero,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getCalendar(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type: this.CONFIG.contentTypeIds.calendar,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getCalendarioHeading(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type:
                            this.CONFIG.contentTypeIds.calendarioHeading,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getEspecialista(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type:
                            this.CONFIG.contentTypeIds.homeEspecialista,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getHomeCards(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type: this.CONFIG.contentTypeIds.homeCards,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getHomeTestimonials(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type:
                            this.CONFIG.contentTypeIds.homeTestimonials,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getLatestRecursos(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type: this.CONFIG.contentTypeIds.recursos,
                        limit: 4,
                        order: '-sys.createdAt',
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getRecursos(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type: this.CONFIG.contentTypeIds.recursos,
                        order: '-sys.createdAt',
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getSingleRecurso(slug: String, query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type: this.CONFIG.contentTypeIds.recursos,
                        'fields.slug': slug,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getRecursosHeading(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type:
                            this.CONFIG.contentTypeIds.recursosHeading,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getIngenieriaHeading(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type:
                            this.CONFIG.contentTypeIds.ingenieriaHeading,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getIngenieriaDescription(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type:
                            this.CONFIG.contentTypeIds.ingenieriaDescription,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getTerapiasHeading(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type:
                            this.CONFIG.contentTypeIds.terapiasHeading,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getTerapiasDescription(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type:
                            this.CONFIG.contentTypeIds.terapiasDescription,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getRedesDeContacto(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type:
                            this.CONFIG.contentTypeIds.redesDeContacto,
                        order: '-sys.createdAt',
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getRedesDeContactoList(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type:
                            this.CONFIG.contentTypeIds.redesDeContactoList,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }

    getRedesDeContactoHeading(query?: object): Promise<Entry<any>[]> {
        return this.client
            .getEntries(
                Object.assign(
                    {
                        content_type:
                            this.CONFIG.contentTypeIds.redesDeContactoHeading,
                    },
                    query
                )
            )
            .then((res) => res.items);
    }
}
