import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Autosize } from 'ng-autosize';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    Autosize
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }