import { Pipe, PipeTransform } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';

let options = {
    renderNode: {
        'embedded-asset-block': (node: any) =>
            `<img class="img-fluid" src="${node.data.target.fields.file.url}"/>`,
    },
};

@Pipe({
    name: 'toHtml',
})
export class ToHtmlPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        return documentToHtmlString(value as Document, options);
    }
}
