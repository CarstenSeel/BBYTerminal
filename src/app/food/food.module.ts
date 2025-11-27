import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { FoodComponent } from "./food.component";

@NgModule({
    declarations: [FoodComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [FoodComponent],
})

export class FoodModule{

}