import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerapiasAlternativasComponent } from './terapias-alternativas.component';

const routes: Routes = [{ path: '', component: TerapiasAlternativasComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TerapiasAlternativasRoutingModule {}
