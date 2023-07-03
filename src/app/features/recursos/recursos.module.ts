import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecursosRoutingModule } from './recursos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { RecursosSingleComponent } from './components/recursos-single/recursos-single.component';
import { RecursosListComponent } from './components/recursos-list/recursos-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [RecursosSingleComponent, RecursosListComponent],
    imports: [
        CommonModule,
        RecursosRoutingModule,
        CoreModule,
        SharedModule,
        NgxPaginationModule,
        HttpClientModule,
        RouterModule,
    ],
})
export class RecursosModule {}
