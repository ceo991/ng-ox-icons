import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OxIconsComponent } from './ox-icons.component';

@NgModule({
    declarations: [OxIconsComponent],
    exports: [OxIconsComponent],
    imports: [CommonModule]
})
export class OxIconsModule {}
