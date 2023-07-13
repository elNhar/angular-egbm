import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EmailService {
    private serviceID: string = environment.EMAILJS_SERVICE_ID;
    private templateID: string = environment.EMAILJS_TEMPLATE_ID;
    private contactID: string = environment.EMAILJS_CONTACT_ID;
    private publicKey: string = environment.EMAILJS_PUBLIC_KEY;

    constructor(private toast: NgToastService) {}

    async sendEmail(e: Event): Promise<boolean> {
        e.preventDefault();
        await emailjs
            .sendForm(
                this.serviceID,
                this.templateID,
                e.target as HTMLFormElement,
                this.publicKey
            )
            .then(
                (result: EmailJSResponseStatus) => {
                    this.toast.success({
                        detail: 'Mensaje enviado con éxito.',
                        summary: 'Exito',
                        duration: 5000,
                    });
                },
                (error) => {
                    this.toast.error({
                        detail: 'Hubo un problema enviando su mensaje.',
                        summary: 'Error',
                        duration: 5000,
                    });
                }
            );
        return Promise.resolve(false);
    }

    async sendContact(e: Event): Promise<boolean> {
        e.preventDefault();
        await emailjs
            .sendForm(
                this.serviceID,
                this.contactID,
                e.target as HTMLFormElement,
                this.publicKey
            )
            .then(
                (result: EmailJSResponseStatus) => {
                    this.toast.success({
                        detail: 'Mensaje enviado con éxito.',
                        summary: 'Exito',
                        duration: 5000,
                    });
                },
                (error) => {
                    console.log(error)
                    this.toast.error({
                        detail: 'Hubo un problema enviando su mensaje.',
                        summary: 'Error',
                        duration: 5000,
                    });
                }
            );
        return Promise.resolve(false);
    }
}
