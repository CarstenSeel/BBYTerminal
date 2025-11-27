import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { DiapersModule } from "../diapers/diapers.module";
import { SizeModule } from "../size/size.module";
import { FoodModule } from "../food/food.module";
import { SleepModule } from "../sleep/sleep.module";
import { SleepComponent } from "../sleep/sleep.component";
import { SizeComponent } from "../size/size.component";
import { FoodComponent } from "../food/food.component";
import { DiapersComponent } from "../diapers/diapers.component";

@NgModule({
    declarations: [
        DashboardComponent,
        SleepComponent,
        SizeComponent,
        FoodComponent,
        DiapersComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        DiapersModule,
        SizeModule,
        FoodModule,
        SleepModule
    ],
    exports: [DashboardComponent],
})

export class DashboardModule{

}