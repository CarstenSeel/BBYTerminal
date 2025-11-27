import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { SizeComponent } from "./size.component";

@NgModule({
    declarations: [SizeComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [SizeComponent],
})

export class SizeModule{

}