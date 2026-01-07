import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { DeleteSleepDialogComponent } from "./deleteSleepDialog.component";

@NgModule({
    declarations: [DeleteSleepDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [DeleteSleepDialogComponent],
})

export class DeleteSleepDialogModule{

}