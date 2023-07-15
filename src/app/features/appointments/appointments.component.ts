import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ContentfulService } from '../../core/services/contentful-service/contentful.service';
import { app } from 'src/app/app.constants';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Appointment, Horas } from './appointment.interface';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
    heading: Array<any> = [];
    appointment: Appointment = {} as Appointment;
    date: { year: number; month: number; day: number };
    appointments: any;
    dailyAppointments: Array<Appointment> = [];
    captchakey = environment.CAPTCHA;
    recaptchaValue: string = '';
    formGroup: FormGroup = {} as FormGroup;
    selectedAppointment: Appointment = {} as Appointment;
    loading: boolean = false;
    appointmentMade: boolean = false;

    @ViewChild('form', { static: false }) form: NgForm = {} as NgForm;

    constructor(
        private contentfulService: ContentfulService,
        private meta: Meta,
        private toast: NgToastService,
        private title: Title,
        private calendar: NgbCalendar,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private config: NgbDatepickerConfig
    ) {
        const current = new Date();
        config.minDate = {
            year: current.getFullYear(), month:
                current.getMonth() + 1, day: current.getDate() + 2
        };
        config.maxDate = {
            year: current.getFullYear(), month:
                current.getMonth() + 3, day: current.getDate()
        };
        this.appointment.fecha = {
            year: current.getFullYear(), month:
                current.getMonth() + 1, day: current.getDate() + 2
        }
        this.date = {
            year: current.getFullYear(), month:
                current.getMonth() + 1, day: current.getDate() + 2
        }
    }

    ngOnInit(): void {
        // set meta and get content
        this.loading = true;
        this.setMeta();
        this.fetchContent();
        this.formGroup = this.formBuilder.group({
            nombre: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            telefono: ['', Validators.required],
            motivoDeConsulta: ['', Validators.required],
            sintomas: ['', Validators.required],
            nivelDeBienestar: ['', Validators.required],
            fecha: ['', Validators.required],
            hora: ['', Validators.required],
            captcha: ['', Validators.required],
            tiempos: ['', Validators.required],
            nacimiento: ['', Validators.required]
        });
    }

    private setMeta(): void {
        // get meta
        this.contentfulService
            .getPages(app.PAGES.CALENDARIO)
            .then((page) => {
                // set meta
                this.meta.addTags([
                    {
                        name: 'description',
                        content: page[0].fields.description,
                    },
                ]);
                this.title.setTitle(
                    `${page[0].fields.title} - ${app.SITE_NAME}`
                );
            })
            .catch((err) => {
                console.error(err);
            });
    }

    private fetchContent(): void {
        // get heading
        this.contentfulService
            .getCalendarioHeading()
            .then((heading) => {
                this.heading = heading;
            })
            .catch((err) => {
                console.error(err);
            });
        // get sliders
        this.contentfulService
            .getCalendar()
            .then((calendar) => {
                calendar.forEach((appointment: any) => {
                    appointment.fields.fecha = this.convertStringToNgbDate(appointment.fields.fecha);
                })
                // display sliders
                this.appointments = calendar;
                this.loading = false;
            })
            .catch((err) => {
                console.error(err);
            }).finally(() => {
                this.showAppointments(this.date);
                this.loading = false;
            });
    }

    public onSubmit(e: Event) {
        if (this.formGroup.valid) {
            window.scrollTo({
                top: 100,
                behavior: 'smooth'
            });
            this.loading = true;
            const url = '/api/confirm';
            const headers = { 'Content-Type': 'application/json' };
            const formElement = e.target as HTMLFormElement;
            const formWithData = new FormData(formElement);
            const formObject: { [key: string]: any } = {};

            formWithData.forEach((value, key) => {
                formObject[key] = value;
            });

            formObject['fecha'] = `${this.selectedAppointment.fecha.year}-${this.selectedAppointment.fecha.month}-${this.selectedAppointment.fecha.day}`;
            formObject['hora'] = this.selectedAppointment.hora;

            const body = JSON.stringify(formObject);

            this.http.post(url, body, { headers }).subscribe(
                (response) => {
                    const dataToSend = {
                        ...formObject,
                        token: response
                    };

                    emailjs.send(
                        environment.EMAILJS_SERVICE_ID,
                        environment.EMAILJS_TEMPLATE_ID,
                        dataToSend,
                        environment.EMAILJS_PUBLIC_KEY
                    ).then((result: EmailJSResponseStatus) => {
                        this.loading = false;
                        this.appointmentMade = true;
                        this.toast.success({
                            detail: 'Mensaje enviado con éxito.',
                            summary: 'Exito',
                            duration: 5000
                        })
                    }, (error) => {
                        this.loading = false;
                        this.toast.error({
                            detail: 'Hubo un problema enviando su mensaje.',
                            summary: 'Error',
                            duration: 5000
                        })
                    })
                        .finally(() => {
                            this.loading = false;
                        });
                },
                (error) => {
                    this.loading = false;
                    // Handle any errors that occurred during the API request
                    console.error(error);
                }
            );
        }
    }

    public showAppointments(e?: any) {
        this.dailyAppointments = [];
        const horaValues: Horas[] = ['12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00'];
        // create daily appointments
        horaValues.forEach((hora: Horas) => {
            const appointment: Appointment = {
                fecha: new NgbDate(
                    e.year,
                    e.month,
                    e.day
                ),
                hora: hora,
                available: true
            };

            this.dailyAppointments.push(appointment);
        });

        // compare and update availability
        if (this.appointments && this.appointments.length > 0) {
            this.appointments.forEach((appointment: any) => {
                const appointmentFound = this.dailyAppointments.find((dailyAppointment: any) =>
                    dailyAppointment.hora === appointment.fields.hora &&
                    dailyAppointment.fecha.year === appointment.fields.fecha.year &&
                    dailyAppointment.fecha.month === appointment.fields.fecha.month &&
                    dailyAppointment.fecha.day === appointment.fields.fecha.day
                );
                if (appointmentFound) {
                    appointmentFound.available = false;
                }
            });
        }
    }

    private convertStringToNgbDate(dateString: string): NgbDate | null {
        const dateParts = dateString.split('-');

        if (dateParts.length === 3) {
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10);
            const day = parseInt(dateParts[2], 10);

            if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                return new NgbDate(year, month, day);
            }
        }

        return null;
    }

    public selectAppointment(appointment: Appointment) {
        this.selectedAppointment = appointment;
        this.formGroup.patchValue({
            fecha: appointment.fecha,
            hora: appointment.hora
        })
    }

    resolved(captcha: String) {
        this.formGroup.patchValue({
            captcha: captcha,
        })
    }
}
