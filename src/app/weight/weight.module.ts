import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { WeightComponent } from "./weight.component";

@NgModule({
    declarations: [WeightComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [WeightComponent],
})

export class WeightModule{

}