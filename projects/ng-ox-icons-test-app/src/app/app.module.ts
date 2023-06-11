import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent }                   from './app.component';
import { OxIconsModule, OxIconsRegistry }       from 'ng-ox-icons';
import { oxIconsAnchor, oxIconsDotsHorizontal } from 'ox-icons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OxIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly oxIconRegistry: OxIconsRegistry) {
    oxIconRegistry.registerIcons([oxIconsDotsHorizontal, oxIconsAnchor]);
  }
}
