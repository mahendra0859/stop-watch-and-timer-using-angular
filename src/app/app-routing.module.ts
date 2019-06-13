import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StopComponent } from './components/stop/stop.component';
import { TimerComponent } from './components/timer/timer.component';


const routes: Routes = [
  {
    path: '',
    component: StopComponent
  },
  {
    path: 'timer',
    component: TimerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
