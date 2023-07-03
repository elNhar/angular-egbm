import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmacionFallidaComponent } from './confirmacion-fallida.component';

const routes: Routes = [{ path: '', component: ConfirmacionFallidaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmacionFallidaRoutingModule { }
