import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoraConfirmadaComponent } from './hora-confirmada.component';

const routes: Routes = [{ path: '', component: HoraConfirmadaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoraConfirmadaRoutingModule { }
