import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { CreateSleepDialogComponent } from "./createSleepDialog.component";

@NgModule({
    declarations: [CreateSleepDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [CreateSleepDialogComponent],
})

export class CreateSleepDialogModule{

}