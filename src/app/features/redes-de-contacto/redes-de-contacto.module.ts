import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedesDeContactoRoutingModule } from './redes-de-contacto-routing.module';
import { RdcListComponent } from './components/rdc-list/rdc-list.component';
import { RdcSingleComponent } from './components/rdc-single/rdc-single.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [RdcListComponent, RdcSingleComponent],
    imports: [
        CommonModule,
        RedesDeContactoRoutingModule,
        CoreModule,
        SharedModule,
        NgxPaginationModule,
        HttpClientModule,
        RouterModule,
    ],
})
export class RedesDeContactoModule {}
