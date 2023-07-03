import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RdcListComponent } from './components/rdc-list/rdc-list.component';
import { RdcSingleComponent } from './components/rdc-single/rdc-single.component';

const routes: Routes = [
    {
        path: '',
        component: RdcListComponent,
    },
    {
        path: ':slug',
        component: RdcSingleComponent,
        data: { preload: true },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RedesDeContactoRoutingModule {}
