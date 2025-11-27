import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodComponent } from './food/food.component';
import { SleepComponent } from './sleep/sleep.component';
import { SizeComponent } from './size/size.component';
import { DiapersComponent } from './diapers/diapers.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FoodComponent,
    SleepComponent,
    SizeComponent,
    DiapersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
