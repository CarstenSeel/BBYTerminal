import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { DeleteWeightDialogComponent } from "./deleteWeightDialog.component";

@NgModule({
    declarations: [DeleteWeightDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [DeleteWeightDialogComponent],
})

export class DeleteWeightDialogModule{

}