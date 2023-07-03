import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmacionFallidaRoutingModule } from './confirmacion-fallida-routing.module';
import { ConfirmacionFallidaComponent } from './confirmacion-fallida.component';


@NgModule({
  declarations: [
    ConfirmacionFallidaComponent
  ],
  imports: [
    CommonModule,
    ConfirmacionFallidaRoutingModule
  ]
})
export class ConfirmacionFallidaModule { }
