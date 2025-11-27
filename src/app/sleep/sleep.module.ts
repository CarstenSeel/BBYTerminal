import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { SleepComponent } from "./sleep.component";

@NgModule({
    declarations: [SleepComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [SleepComponent],
})

export class SleepModule{

}