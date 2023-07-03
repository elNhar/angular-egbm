import { NgbDateStruct, NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface Appointment {
    nombre?: string;
    fecha: NgbDateStruct | NgbDate;
    email?: string;
    telefono?: string;
    motivoDeConsulta?: string;
    sintomas?: string;
    nivelDeBienestar?: string;
    hora: Horas;
    available?: boolean;
    recaptcha?: any;
}

export type Horas = '12:00 - 13:00' | '13:00 - 14:00' | '14:00 - 15:00' | '15:00 - 16:00' | '16:00 - 17:00' | '17:00 - 18:00';
