import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StopComponent } from './components/stop/stop.component';
import { TimerComponent } from './components/timer/timer.component';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    StopComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
