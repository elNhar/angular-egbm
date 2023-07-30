import { NgbDateStruct, NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface Appointment {
    nombre?: string;
    fecha: NgbDateStruct | NgbDate;
    modalidad?: string;
    email?: string;
    telefono?: string;
    motivoDeConsulta?: string;
    sintomas?: string;
    nivelDeBienestar?: string;
    hora: Horas;
    available?: boolean;
    recaptcha?: any;
}

export type Horas = '18:00 - 19:00' | '19:00 - 20:00' | '20:00 - 21:00';
