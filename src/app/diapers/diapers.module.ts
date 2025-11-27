import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { DiapersComponent } from "./diapers.component";

@NgModule({
    declarations: [DiapersComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [DiapersComponent],
})

export class DiapersModule{

}