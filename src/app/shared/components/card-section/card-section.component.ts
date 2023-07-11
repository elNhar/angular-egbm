import { Component, Input } from '@angular/core';

import { CardSection } from './card-section.interface';

@Component({
    selector: 'app-card-section',
    templateUrl: './card-section.component.html',
    styleUrls: ['./card-section.component.scss'],
})
export class CardSectionComponent {
    @Input() cards: Array<CardSection> = [];
}
