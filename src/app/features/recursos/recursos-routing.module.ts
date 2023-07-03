import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecursosListComponent } from './components/recursos-list/recursos-list.component';
import { RecursosSingleComponent } from './components/recursos-single/recursos-single.component';

const routes: Routes = [
    {
        path: '',
        component: RecursosListComponent,
    },
    {
        path: ':slug',
        component: RecursosSingleComponent,
        data: { preload: true },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecursosRoutingModule {}
