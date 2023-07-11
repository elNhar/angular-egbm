import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngenieriaRoutingModule } from './ingenieria-routing.module';
import { IngenieriaComponent } from './ingenieria.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [IngenieriaComponent],
    imports: [CommonModule, IngenieriaRoutingModule, SharedModule, CoreModule],
})
export class IngenieriaModule {}
