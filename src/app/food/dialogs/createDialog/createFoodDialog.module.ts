import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { CreateFoodDialogComponent } from "./createFoodDialog.component";

@NgModule({
    declarations: [CreateFoodDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [CreateFoodDialogComponent],
})

export class CreateFoodDialogModule{

}