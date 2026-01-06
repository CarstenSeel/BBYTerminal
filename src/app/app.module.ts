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
import { MAT_DATE_LOCALE, MatButtonModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInput, MatInputModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApointmentsComponent } from './apointments/apointments.component';
import { WeightComponent } from './weight/weight.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DeleteDialogComponent } from './apointments/dialogs/deleteDialog/deleteDialog.component';
import { DataShareService } from './Service/dataShare.service';
import { CreateDialogComponent } from './apointments/dialogs/createDialog/createDialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EditDialogComponent } from './apointments/dialogs/editDialog/editDialog.component';
import { ChartsModule } from 'ng2-charts'
import { CreateSizeDialogComponent } from './size/dialogs/createDialog/createSizeDialog.component';
import { DeleteSizeDialogComponent } from './size/dialogs/deleteDialog/deleteSizeDialog.component';

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
    SidebarComponent,
    DeleteDialogComponent,
    CreateDialogComponent,
    EditDialogComponent,
    CreateSizeDialogComponent,
    DeleteSizeDialogComponent
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
    MatMenuModule,
    MatDialogModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ChartsModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
        DataShareService,
        { provide: MAT_DATE_LOCALE,
            useValue: {
                parse: {
                    dateInput: 'YYYY-MM-DD',
                    monthInput: 'MMMM',
                    yearInput: 'YYYY',
                    timeInput: 'HH:mm',
                    datetimeInput: 'YYYY-MM-DD HH:mm',
                },
                display: {
                    dateInput: 'YYYY-MM-DD',
                    monthInput: 'MMMM',
                    yearInput: 'YYYY',
                    timeInput: 'HH:mm',
                    datetimeInput: 'YYYY-MM-DD HH:mm',
                    monthYearLabel: 'YYYY MMMM',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY',
                    popupHeaderDateLabel: 'MMM DD, ddd',
                },
            },
        },
      ],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteDialogComponent,
    CreateDialogComponent,
    EditDialogComponent,
    CreateSizeDialogComponent,
    DeleteSizeDialogComponent
  ]
})
export class AppModule { }
