import { Component, Input } from '@angular/core';
import { Heading } from './heading.interface';

@Component({
    selector: 'app-heading',
    templateUrl: './heading.component.html',
    styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent {
    @Input() heading: Array<Heading> = [];
}
