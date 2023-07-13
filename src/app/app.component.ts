import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div id="app">
            <div class="wrapper">
                <div class="wrapper-header">
                    <app-header></app-header>
                </div>
                <div class="wrapper-content">
                    <router-outlet></router-outlet>
                    <lib-ng-toast></lib-ng-toast>
                </div>
                <div class="wrapper-footer">
                    <app-footer></app-footer>
                </div>
            </div>
        </div>
    `,
})
export class AppComponent {
    title = 'egbmdimensions';
}
