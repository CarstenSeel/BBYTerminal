import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodComponent } from './food/food.component';
import { SleepComponent } from './sleep/sleep.component';
import { SizeComponent } from './size/size.component';
import { DiapersComponent } from './diapers/diapers.component';
import { AppRoutingModule } from './/app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule, MatDatepickerModule, MatDividerModule, MatFormFieldModule, MatInput, MatInputModule, MatMenuModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApointmentsComponent } from './apointments/apointments.component';
import { WeightComponent } from './weight/weight.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FoodComponent,
    SleepComponent,
    SizeComponent,
    DiapersComponent,
    ApointmentsComponent,
    WeightComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
