import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { DeleteDiaperDialogComponent } from "./deleteDiaperDialog.component";

@NgModule({
    declarations: [DeleteDiaperDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [DeleteDiaperDialogComponent],
})

export class DeleteDiaperDialogModule{

}