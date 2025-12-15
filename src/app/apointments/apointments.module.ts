import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule, MatIconModule } from "@angular/material";
import { ApointmentsComponent } from "./apointments.component";
import { DeleteDialogComponent } from "../dialogs/deleteDialog.component";

@NgModule({
    declarations: [ApointmentsComponent],
    imports: [
        CommonModule,
        MatIconModule,
        DeleteDialogComponent,
        MatDialogModule
    ],
    exports: [ApointmentsComponent],
})

export class ApointmentsModule{

}