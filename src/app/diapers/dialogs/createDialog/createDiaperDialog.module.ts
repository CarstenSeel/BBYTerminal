import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { CreateDiaperDialogComponent } from "./createDiaperDialog.component";

@NgModule({
    declarations: [CreateDiaperDialogComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [CreateDiaperDialogComponent],
})

export class CreateDiaperDialogModule{

}