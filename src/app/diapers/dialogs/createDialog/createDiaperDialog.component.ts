import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-createDiaperDialog',
  templateUrl: './createDiaperDialog.component.html',
  styleUrls: ['./createDiaperDialog.component.scss']
})
export class CreateDiaperDialogComponent implements OnInit {
    form = new FormGroup({
        type : new FormControl('', [Validators.required]),
        time : new FormControl(new Date(), [Validators.required])
      });

    constructor(public dialogRef: MatDialogRef<CreateDiaperDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
 
 
    ngOnInit() {
    }
 
    saveChanges() {
        if (this.form.valid) {
          let result = {
              type:  this.form.value.type,
              time: this.form.value.time
              };
          this.dialogRef.close(result);
        } else {
            this.markFormGroupTouched(this.form);
        }
    }
 
    closeDialog(){
        this.dialogRef.close();
    }
 
    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach(control => {
          if (control instanceof FormGroup) {
            this.markFormGroupTouched(control);
          } else {
            control.markAsTouched();
          }
        });
      }
}
