import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-recaptcha',
    templateUrl: './recaptcha.component.html',
    styleUrls: ['./recaptcha.component.scss'],
})
export class RecaptchaComponent {
    captchakey: string = environment.CAPTCHA;
}
