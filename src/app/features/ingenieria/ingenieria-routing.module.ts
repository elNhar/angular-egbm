import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngenieriaComponent } from './ingenieria.component';

const routes: Routes = [{ path: '', component: IngenieriaComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IngenieriaRoutingModule {}
