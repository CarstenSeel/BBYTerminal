import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { ApointmentsComponent } from "./apointments.component";

@NgModule({
    declarations: [ApointmentsComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [ApointmentsComponent],
})

export class ApointmentsModule{

}