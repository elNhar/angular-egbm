import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerapiasAlternativasRoutingModule } from './terapias-alternativas-routing.module';
import { TerapiasAlternativasComponent } from './terapias-alternativas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
    declarations: [TerapiasAlternativasComponent],
    imports: [
        CommonModule,
        TerapiasAlternativasRoutingModule,
        SharedModule,
        CoreModule,
    ],
})
export class TerapiasAlternativasModule {}
