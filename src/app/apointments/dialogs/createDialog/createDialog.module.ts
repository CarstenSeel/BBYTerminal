import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { CreateDialogComponent } from "./createDialog.component";

@NgModule({
    declarations: [CreateDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [CreateDialogComponent],
})

export class CreateDialogModule{

}