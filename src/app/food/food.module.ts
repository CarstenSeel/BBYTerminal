import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DateAdapter, MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatRadioModule, MatSelectModule } from "@angular/material";
import { FoodComponent } from "./food.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { ChartsModule } from "ng2-charts";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
    declarations: [FoodComponent],
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
    exports: [FoodComponent],
})

export class FoodModule{

}