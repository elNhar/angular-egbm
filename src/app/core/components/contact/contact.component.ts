import { Component } from '@angular/core';

import { EmailService } from 'src/app/shared/services/email-service/email.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    isLoading: boolean = false;
    messageSent: boolean = false;

    constructor(
        private emailService: EmailService
    ) {}

    public sendEmail(e: Event) {
        this.isLoading = true;
        this.emailService.sendContact(e).then(resolved => {
          this.isLoading = resolved;
        }).finally(() => {
            this.isLoading = false;
            this.messageSent = true;
            this.clearFormFields();
            setTimeout(() => {
                this.messageSent = false;
            }, 5000);
        });
    }

    private clearFormFields() {
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const phoneInput = document.getElementById('phone') as HTMLInputElement;
        const messageTextArea = document.getElementById('message') as HTMLTextAreaElement;
      
        if (nameInput && emailInput && phoneInput && messageTextArea) {
          nameInput.value = '';
          emailInput.value = '';
          phoneInput.value = '';
          messageTextArea.value = '';
        }
    }
}
