import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { CreateWeightDialogComponent } from "./createWeightDialog.component";

@NgModule({
    declarations: [CreateWeightDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [CreateWeightDialogComponent],
})

export class CreateWeightDialogModule{

}