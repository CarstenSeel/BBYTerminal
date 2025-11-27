import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SizeComponent } from './size/size.component';
import { DiapersComponent } from './diapers/diapers.component';
import { SleepComponent } from './sleep/sleep.component';
import { FoodComponent } from './food/food.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'size', component: SizeComponent},
  {path: 'diapers', component: DiapersComponent},
  {path: 'sleep', component: SleepComponent},
  {path: 'food', component: FoodComponent}
];
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
