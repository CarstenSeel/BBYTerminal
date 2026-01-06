import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { DeleteSizeDialogComponent } from "./deleteSizeDialog.component";

@NgModule({
    declarations: [DeleteSizeDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [DeleteSizeDialogComponent],
})

export class DeleteSizeDialogModule{

}