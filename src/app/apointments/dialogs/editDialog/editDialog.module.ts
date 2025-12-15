import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { EditDialogComponent } from "./editDialog.component";

@NgModule({
    declarations: [EditDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [EditDialogComponent],
})

export class EditDialogModule{

}