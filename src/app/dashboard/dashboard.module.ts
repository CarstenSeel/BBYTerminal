import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { DiapersModule } from "../diapers/diapers.module";
import { SizeModule } from "../size/size.module";
import { FoodModule } from "../food/food.module";
import { SleepModule } from "../sleep/sleep.module";
import { SleepComponent } from "../sleep/sleep.component";
import { SizeComponent } from "../size/size.component";
import { FoodComponent } from "../food/food.component";
import { DiapersComponent } from "../diapers/diapers.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatButtonModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatRadioModule, MatSelectModule } from "@angular/material";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { ChartsModule } from "ng2-charts";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
    declarations: [
        DashboardComponent,
        // SleepComponent,
        // SizeComponent,
        // FoodComponent,
        // DiapersComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
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
        MatMenuModule,
        MatDialogModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        ChartsModule,
        MatOptionModule,
        MatSelectModule,
        MatRadioModule,
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),
    ],
    exports: [DashboardComponent],
})

export class DashboardModule{

}