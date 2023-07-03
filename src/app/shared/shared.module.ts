import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToHtmlPipe } from './utils/to-html-pipe/to-html.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { EmailService } from './services/email-service/email.service';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { TruncatePipe } from './utils/truncate/truncate.pipe';
import { SafePipe } from './utils/safe/safe.service';

@NgModule({
    declarations: [
        ToHtmlPipe,
        LoaderComponent,
        RecaptchaComponent,
        TruncatePipe,
        SafePipe,
    ],
    imports: [CommonModule, RecaptchaModule],
    exports: [
        ToHtmlPipe,
        LoaderComponent,
        TruncatePipe,
        RecaptchaComponent,
        SafePipe,
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [TruncatePipe, ToHtmlPipe, EmailService, SafePipe],
        };
    }
}
