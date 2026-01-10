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
import { CreateDialogComponent } from "../apointments/dialogs/createDialog/createDialog.component";
import { DeleteDialogComponent } from "../apointments/dialogs/deleteDialog/deleteDialog.component";
import { EditDialogComponent } from "../apointments/dialogs/editDialog/editDialog.component";
import { CreateDiaperDialogComponent } from "../diapers/dialogs/createDialog/createDiaperDialog.component";
import { DeleteDiaperDialogComponent } from "../diapers/dialogs/deleteDialog/deleteDiaperDialog.component";
import { CreateSizeDialogComponent } from "../size/dialogs/createDialog/createSizeDialog.component";
import { DeleteSizeDialogComponent } from "../size/dialogs/deleteDialog/deleteSizeDialog.component";
import { CreateSleepDialogComponent } from "../sleep/dialogs/createDialog/createSleepDialog.component";
import { DeleteSleepDialogComponent } from "../sleep/dialogs/deleteDialog/deleteSleepDialog.component";
import { CreateWeightDialogComponent } from "../weight/dialogs/createDialog/createWeightDialog.component";
import { DeleteWeightDialogComponent } from "../weight/dialogs/deleteDialog/deleteWeightDialog.component";
import { CreateFoodDialogComponent } from "./dialogs/createDialog/createFoodDialog.component";
import { DeleteFoodDialogComponent } from "./dialogs/deleteDialog/deleteFoodDialog.component";

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
    entryComponents: [
        DeleteDialogComponent,
        CreateDialogComponent,
        EditDialogComponent,
        CreateSizeDialogComponent,
        DeleteSizeDialogComponent,
        CreateWeightDialogComponent,
        DeleteWeightDialogComponent,
        CreateDiaperDialogComponent,
        DeleteDiaperDialogComponent,
        CreateFoodDialogComponent,
        DeleteFoodDialogComponent,
        CreateSleepDialogComponent,
        DeleteSleepDialogComponent
      ]
})

export class FoodModule{

}