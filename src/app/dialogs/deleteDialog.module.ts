import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { DeleteDialogComponent } from "./deleteDialog.component";

@NgModule({
    declarations: [DeleteDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [DeleteDialogComponent],
})

export class DeleteDialogModule{

}