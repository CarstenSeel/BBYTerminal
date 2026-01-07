import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { DeleteFoodDialogComponent } from "./deleteFoodDialog.component";

@NgModule({
    declarations: [DeleteFoodDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [DeleteFoodDialogComponent],
})

export class DeleteFoodDialogModule{

}