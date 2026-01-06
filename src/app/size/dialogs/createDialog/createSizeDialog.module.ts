import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { CreateSizeDialogComponent } from "./createSizeDialog.component";

@NgModule({
    declarations: [CreateSizeDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [CreateSizeDialogComponent],
})

export class CreateSizeDialogModule{

}