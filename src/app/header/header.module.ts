import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material";
import { HeaderComponent } from "./header.component";

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [HeaderComponent],
})

export class HeaderModule{

}