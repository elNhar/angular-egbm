import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoraConfirmadaRoutingModule } from './hora-confirmada-routing.module';
import { HoraConfirmadaComponent } from './hora-confirmada.component';


@NgModule({
  declarations: [
    HoraConfirmadaComponent
  ],
  imports: [
    CommonModule,
    HoraConfirmadaRoutingModule
  ]
})
export class HoraConfirmadaModule { }
