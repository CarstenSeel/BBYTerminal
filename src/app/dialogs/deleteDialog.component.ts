import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleteDialog',
  templateUrl: './deleteDialog.component.html',
  styleUrls: ['./deleteDialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
    constructor (
        public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
 
 
    ngOnInit() {
    }

    delete(isDelete:boolean) {
        this.dialogRef.close(isDelete);
    }

}
